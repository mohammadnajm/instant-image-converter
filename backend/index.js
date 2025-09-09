require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const sharp = require('sharp')
const mongoose = require('mongoose')
const Convert = require('./models/convert')

mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const app = express()

// CORS: allow all origins in dev; tighten for prod as needed
app.use(cors({ origin: true }))

const MAX_SIZE_BYTES = 25 * 1024 * 1024 // 25MB
const upload = multer({ limits: { fileSize: MAX_SIZE_BYTES } })

app.get('/health', (req, res) => res.json({ ok: true }))

app.post('/api/convert', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Missing file')
    }

    let target = String((req.body.target || '')).toLowerCase()
    const allowed = new Set(['jpg','jpeg','png','webp','avif'])
    if (!allowed.has(target)) {
      return res.status(400).send('Unsupported target format')
    }
    if (target === 'jpg') target = 'jpeg'

    let q = parseInt(String(req.body.quality || '90'), 10)
    if (!Number.isFinite(q)) q = 90
    q = Math.max(40, Math.min(100, q))

    let img = sharp(req.file.buffer, { limitInputPixels: false })

    // Fill transparency if converting to JPEG
    if (target === 'jpeg') {
      img = img.flatten({ background: { r: 255, g: 255, b: 255 } })
    }

    const opts = {
      jpeg: { quality: q, mozjpeg: true },
      png: { compressionLevel: 9 },
      webp: { quality: q },
      avif: { quality: q }
    }

    // Produce the result buffer (if this fails, آمار افزایش داده نمی‌شود)
    const buffer = await img.toFormat(target, opts[target]).toBuffer()

    // --- SUCCESS: increment total conversions atomically in Mongo ---
    // یک رکورد سراسری نگه می‌داریم؛ اگر نبود ساخته می‌شود
    try {
      await Convert.findOneAndUpdate(
        {},                      // global single doc
        { $inc: { total: 1 } },  // atomic increment
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
    } catch (statErr) {
      console.error('Stats increment failed:', statErr)
      // حتی اگر آمار fail شود، فایل را تحویل می‌دهیم
    }

    const originalName = req.file.originalname || 'image'
    const base = originalName.replace(/\.[^.]*$/, '') || 'converted'

    const resExt = target === 'jpeg' ? 'jpg' : target
    const mime = target === 'jpeg' ? 'image/jpeg' : `image/${target}`
    res.setHeader('Content-Type', mime)
    res.setHeader('Content-Disposition', `attachment; filename="${base}.${resExt}"`)
    return res.send(buffer)
  } catch (err) {
    console.error('Conversion error:', err)
    return res.status(500).send('Conversion failed')
  }
})

// Stats endpoint: read from Mongo
app.get('/api/stats', async (req, res) => {
  try {
    const doc = await Convert.findOne({}, 'total').lean()
    res.json({ totalConverted: doc?.total ?? 0 })
  } catch (e) {
    console.error('Stats read failed:', e)
    res.status(500).json({ totalConverted: 0 })
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`)
})
