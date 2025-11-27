<template>
  <div class="relative min-h-screen">
    <!-- Ambient background blur lights -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>
      <div class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-3xl"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-[#0a1426]"></div>
    </div>

    <div class="container mx-auto max-w-6xl p-6 text-gray-100">
      <!-- HERO -->
      <header ref="heroRef" class="mb-12">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <!-- Left -->
          <div class="max-w-3xl">
            <!-- pill -->
            <div
              class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur px-3 py-1 text-xs text-white/70">
              <SparklesIcon class="w-4 h-4" aria-hidden="true" />
              Free • No sign-up • In-memory
            </div>

            <!-- headline -->
            <h1 class="mt-3 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              <span class="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Convert images instantly
              </span><br />
              <span class="text-white/90">PNG ↔ JPG, SVG → WEBP/AVIF</span>
            </h1>

            <!-- sub -->
            <p class="mt-3 text-white/70">
              Pro-grade online converter with precise upload & processing progress. Rasterize SVGs cleanly,
              control quality for JPG/WEBP/AVIF, and download in one click.
            </p>

            <!-- bullets -->
            <ul class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <li class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur px-3 py-2">
                <BoltIcon class="w-5 h-5" aria-hidden="true" /> Fast & lightweight
              </li>
              <li class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur px-3 py-2">
                <ShieldCheckIcon class="w-5 h-5" aria-hidden="true" /> Privacy-friendly
              </li>
              <li class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur px-3 py-2">
                <PhotoIcon class="w-5 h-5" aria-hidden="true" /> Quality control
              </li>
            </ul>


          </div>

          <!-- Right info card -->
          <aside class="w-full md:w-80 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-glass">
            <div class="text-xs uppercase text-white/60 mb-2">Supported formats</div>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-xs">PNG</span>
              <span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-xs">JPG</span>
              <span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-xs">SVG</span>
              <span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-xs">WEBP</span>
              <span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-xs">AVIF</span>
            </div>
            <div class="mt-4 text-xs text-white/60">Optimized for Core Web Vitals & page speed.</div>
          </aside>
        </div>
      </header>
      <!-- STATS -->
      <section id="stats" class="mb-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <div class="flex items-center justify-between gap-4 flex-col sm:flex-row">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
              <!-- می‌تونی ChartBarIcon یا BoltIcon هم بذاری -->
              <svg class="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 19h16M7 10v6M12 5v11M17 8v8" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold">Live conversions</h3>
              <p class="text-white/60 text-sm">Total images converted so far</p>
            </div>
          </div>

          <div class="text-right">
            <div class="text-4xl font-extrabold tracking-tight">
              <span class="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                {{ totalConverted.toLocaleString() }}
              </span>
            </div>
            <div class="text-xs text-white/60 mt-1">auto-updated</div>
          </div>
        </div>
      </section>



      <!-- UPLOAD -->
      <section id="upload" class="mb-8">
        <UploadDropzone @files="addFiles" />
      </section>

      <!-- CONTROLS -->
      <section class="mb-8 grid md:grid-cols-3 gap-4">
        <div class="md:col-span-1">
          <label class="block text-sm font-medium mb-1 text-white/80">Output format</label>

          <div ref="formatDropdown" class="relative" @keydown.escape.prevent="formatOpen = false">
            <!-- Trigger -->
            <button type="button"
              class="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-left px-3 py-2 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              @click="formatOpen = !formatOpen" :aria-expanded="formatOpen" aria-haspopup="listbox">
              <div class="min-w-0">
                <div class="font-medium truncate">{{ currentFormat.label }}</div>
                <div class="text-xs text-white/60 truncate">{{ currentFormat.desc }}</div>
              </div>
              <ChevronUpDownIcon class="w-5 h-5 shrink-0 transition-transform" :class="formatOpen ? 'rotate-180' : ''"
                aria-hidden="true" />
            </button>

            <!-- Menu -->
            <ul v-if="formatOpen"
              class="absolute z-20 mt-2 w-full rounded-xl border border-white/10 bg-[#0f1526]/90 backdrop-blur-xl shadow-glass p-1"
              role="listbox">
              <li v-for="opt in formatOptions" :key="opt.value">
                <button type="button"
                  class="w-full text-left px-3 py-2 rounded-lg flex items-start justify-between gap-3 hover:bg-white/10 focus:bg-white/10 outline-none"
                  :class="opt.value === target ? 'bg-white/10 ring-1 ring-white/10' : ''" role="option"
                  :aria-selected="opt.value === target" @click="selectFormat(opt.value)">
                  <div class="min-w-0">
                    <div class="font-medium truncate">{{ opt.label }}</div>
                    <div class="text-xs text-white/60 truncate">{{ opt.desc }}</div>
                  </div>
                  <CheckIcon v-if="opt.value === target" class="w-5 h-5 text-emerald-300 shrink-0" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="md:col-span-2" v-if="showQuality">
          <label class="block text-sm font-medium mb-1 text-white/80">Quality (JPG/WEBP/AVIF)</label>
          <input type="range" min="40" max="100" step="1" v-model.number="quality" class="w-full accent-indigo-500" />
          <div class="text-xs text-white/60 mt-1">{{ quality }}%</div>
        </div>
      </section>


      <!-- ACTIONS -->
      <section class="mb-6 flex items-center gap-3" v-if="files.length">
        <button @click="clearAll"
          class="px-3 py-2 text-sm rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-xl transition">
          Clear all
        </button>
        <button @click="convertAll" :disabled="isConverting || !files.length"
          class="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white disabled:opacity-50 shadow hover:brightness-110 active:scale-[.98] transition">
          {{ isConverting ? 'Converting…' : 'Convert all' }}
        </button>
      </section>

      <!-- FILE LIST WITH PREVIEW & PROGRESS -->
      <section v-if="files.length" class="mb-12">
        <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li v-for="f in files" :key="f.id"
            class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-glass">
            <div class="relative aspect-video bg-white/5 flex items-center justify-center">
              <img v-if="f.previewUrl" :src="f.previewUrl" :alt="f.file.name" class="h-full w-full object-cover"
                loading="lazy" />
              <div v-else class="text-white/50 text-sm">Preview</div>

              <!-- Overlay progress text -->
              <div v-if="f.status !== 'done' && f.status !== 'error'"
                class="absolute bottom-2 right-2 rounded-full bg-black/40 backdrop-blur px-2 py-1 text-xs">
                <span v-if="f.status === 'uploading'">Upload {{ Math.round(f.uploadPct) }}%</span>
                <span v-else-if="f.status === 'processing'">Processing {{ Math.round(f.processPct) }}%</span>
                <span v-else>Ready</span>
              </div>
            </div>

            <div class="p-4">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="font-medium truncate" :title="f.file.name">{{ f.file.name }}</div>
                  <div class="text-xs text-white/60">{{ prettySize(f.file.size) }} • {{ ext(f.file.name).toUpperCase()
                    }} → {{ target.toUpperCase() }}</div>
                </div>
                <span class="shrink-0 text-xs rounded-full px-2 py-0.5" :class="{
                  'bg-white/10 text-white/70': f.status === 'idle',
                  'bg-indigo-500/20 text-indigo-300': f.status === 'uploading',
                  'bg-amber-500/20 text-amber-300': f.status === 'processing',
                  'bg-emerald-500/20 text-emerald-300': f.status === 'done',
                  'bg-rose-500/20 text-rose-300': f.status === 'error'
                }">
                  {{ statusLabel(f.status) }}
                </span>
              </div>

              <!-- Upload progress -->
              <div v-if="f.status === 'uploading'" class="mt-3">
                <div class="h-2 rounded bg-white/10 overflow-hidden">
                  <div class="h-full bg-indigo-500 transition-[width] duration-300"
                    :style="{ width: f.uploadPct + '%' }"></div>
                </div>
              </div>

              <!-- Processing (conversion) progress -->
              <div v-if="f.status === 'processing'" class="mt-3">
                <div class="h-2 rounded bg-white/10 overflow-hidden">
                  <div class="h-full bg-fuchsia-500 transition-[width] duration-300"
                    :style="{ width: f.processPct + '%' }"></div>
                </div>
              </div>

              <!-- Done / Error actions -->
              <div class="mt-4 flex items-center gap-2">
                <button v-if="f.status === 'done' && f.resultUrl" @click="downloadResult(f)"
                  class="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:brightness-110 active:scale-[.98] transition">
                  Download
                </button>
                <button v-if="f.status === 'error'" @click="retryOne(f)"
                  class="px-3 py-2 rounded-lg bg-rose-600 text-white hover:brightness-110 active:scale-[.98] transition">
                  Retry
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!-- FEATURES / SEO CONTENT -->
      <!-- FEATURES / SEO CONTENT -->
      <section id="why" class="mb-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h2 class="text-2xl font-bold mb-2">Why developers choose this image converter</h2>
        <p class="text-white/70 max-w-3xl">
          Convert images online with a professional, privacy-friendly workflow. Turn <strong>PNG ⇄ JPG</strong>,
          rasterize
          <strong>SVG → PNG/JPG/WEBP/AVIF</strong>, and export modern formats that load faster and score better on Core
          Web Vitals.
        </p>

        <div class="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-white/85">
          <!-- Card -->
          <article class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center gap-3 mb-1">
              <div class="h-9 w-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <BoltIcon class="w-5 h-5" aria-hidden="true" />
              </div>
              <div class="text-lg font-semibold">Speed & Simplicity</div>
            </div>
            <p class="text-white/70 text-sm">
              Drag & drop, precise progress for upload/convert, and one-click downloads. No sign-up, no friction.
            </p>
          </article>

          <article class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center gap-3 mb-1">
              <div class="h-9 w-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <PhotoIcon class="w-5 h-5" aria-hidden="true" />
              </div>
              <div class="text-lg font-semibold">Pro-grade Output</div>
            </div>
            <p class="text-white/70 text-sm">
              Crisp SVG rasterization plus adjustable quality for JPG/WEBP/AVIF — balance fidelity and size.
            </p>
          </article>

          <article class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center gap-3 mb-1">
              <div class="h-9 w-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <ChartBarIcon class="w-5 h-5" aria-hidden="true" />
              </div>
              <div class="text-lg font-semibold">Built for Performance</div>
            </div>
            <p class="text-white/70 text-sm">
              Smaller images → faster LCP & better UX. Ideal for landing pages, product galleries, and blogs.
            </p>
          </article>

          <article class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center gap-3 mb-1">
              <div class="h-9 w-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <ShieldCheckIcon class="w-5 h-5" aria-hidden="true" />
              </div>
              <div class="text-lg font-semibold">Privacy-friendly</div>
            </div>
            <p class="text-white/70 text-sm">
              In-memory processing only — no persistent storage. Your assets stay yours.
            </p>
          </article>

          <article class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center gap-3 mb-1">
              <div class="h-9 w-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <SparklesIcon class="w-5 h-5" aria-hidden="true" />
              </div>
              <div class="text-lg font-semibold">Designer & Marketer Ready</div>
            </div>
            <p class="text-white/70 text-sm">
              Export lightweight hero images, product shots, and social visuals in seconds.
            </p>
          </article>

          <article class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center gap-3 mb-1">
              <div class="h-9 w-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <ArrowsRightLeftIcon class="w-5 h-5" aria-hidden="true" />
              </div>
              <div class="text-lg font-semibold">Broad Format Support</div>
            </div>
            <p class="text-white/70 text-sm">
              PNG, JPG, SVG, WEBP, AVIF — convert between the formats modern sites and apps actually use.
            </p>
          </article>
        </div>

        <!-- Extra SEO sub-section -->
        <div class="mt-8 grid md:grid-cols-3 gap-4">
          <div class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center gap-2 mb-1">
              <ShoppingBagIcon class="w-5 h-5" aria-hidden="true" />
              <h3 class="font-semibold">Web & e-commerce</h3>
            </div>
            <p class="text-white/70 text-sm">Faster product pages and better conversion with optimized imagery.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center gap-2 mb-1">
              <PaintBrushIcon class="w-5 h-5" aria-hidden="true" />
              <h3 class="font-semibold">Design & agencies</h3>
            </div>
            <p class="text-white/70 text-sm">Deliver pixel-perfect assets in the exact formats your clients need.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center gap-2 mb-1">
              <BookOpenIcon class="w-5 h-5" aria-hidden="true" />
              <h3 class="font-semibold">Blogs & SEO</h3>
            </div>
            <p class="text-white/70 text-sm">Improve load times, CLS, and reader experience with smaller files.</p>
          </div>
        </div>
      </section>



      <section class="mb-12">
        <h2 class="text-xl font-semibold mb-3">Supported conversions</h2>
        <p class="text-white/70">
          Convert <strong>PNG ↔ JPG</strong>, <strong>SVG → PNG/JPG/WEBP/AVIF</strong>, and generate
          <strong>WEBP/AVIF</strong> from PNG or JPG. PNG transparency is flattened to white when converting to JPG.
        </p>
      </section>

      <section class="mb-16">
        <h2 class="text-xl font-semibold mb-3">FAQ</h2>
        <details class="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 mb-3">
          <summary class="cursor-pointer font-medium">Is conversion lossless?</summary>
          <p class="text-white/70 mt-2">PNG is lossless. JPG/WEBP/AVIF use quality settings; higher quality means larger
            files.</p>
        </details>
        <details class="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 mb-3">
          <summary class="cursor-pointer font-medium">Do you store my files?</summary>
          <p class="text-white/70 mt-2">No. Files are processed in memory and streamed back to your browser.</p>
        </details>
      </section>





      <!-- GITHUB CTA -->
      <section id="github" class="mb-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <div class="flex items-start justify-between gap-4 flex-col md:flex-row">
          <div class="max-w-3xl">
            <h2 class="text-2xl font-bold mb-2">We’re open-source — show some love</h2>
            <p class="text-white/70">
              If this converter saves you time, please star the repository. Your support helps us ship batch ZIP, resize
              presets,
              and metadata control.
            </p>
          </div>
          <div class="shrink-0 flex flex-wrap gap-2">
            <a :href="repoUrl" target="_blank" rel="noopener"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:brightness-110 active:scale-[.98] transition">
              <StarIcon class="w-5 h-5" aria-hidden="true" /> Star on GitHub
            </a>
            <a :href="repoUrl + '/fork'" target="_blank" rel="noopener"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10">
              <CodeBracketIcon class="w-5 h-5" aria-hidden="true" /> Fork
            </a>
            <a :href="repoUrl + '/issues/new'" target="_blank" rel="noopener"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10">
              <ExclamationTriangleIcon class="w-5 h-5" aria-hidden="true" /> Report issue
            </a>
          </div>
        </div>
      </section>


      <footer class="mt-10 text-xs text-white/50">
        <p>Notes: SVGs are rasterized. PNG transparency becomes white when converting to JPG.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import UploadDropzone from '@/components/UploadDropzone.vue'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/24/outline'

const formatOpen = ref(false)
const formatDropdown = ref(null)

const formatOptions = [
  { value: 'jpg', label: 'JPG', desc: 'Best for photos · lossy · wide support' },
  { value: 'png', label: 'PNG', desc: 'Lossless · supports transparency' },
  { value: 'webp', label: 'WEBP', desc: 'Modern codec · small files · web-ready' },
  { value: 'avif', label: 'AVIF', desc: 'Next-gen compression · smallest size' }
]

const currentFormat = computed(() =>
  formatOptions.find(o => o.value === target.value) || formatOptions[0]
)

function selectFormat(val) {
  target.value = val
  formatOpen.value = false
}

// بستن منو با کلیک بیرون
onMounted(() => {
  const onClick = (e) => {
    if (!formatDropdown.value) return
    if (!formatDropdown.value.contains(e.target)) formatOpen.value = false
  }
  document.addEventListener('click', onClick)
  onBeforeUnmount(() => document.removeEventListener('click', onClick))
  fetchStats()
  // هر 20 ثانیه یک بار رفرش
  const t = setInterval(fetchStats, 20000)
  onBeforeUnmount(() => clearInterval(t))
})
// Heroicons (outline set)
import {
  BoltIcon,
  PhotoIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowsRightLeftIcon,
  ShoppingBagIcon,
  PaintBrushIcon,
  BookOpenIcon,
  StarIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

const files = ref([]) // { id, file, previewUrl, status, uploadPct, processPct, resultUrl }
const target = ref('jpg')
const quality = ref(90)
const isConverting = ref(false)
const repoUrl = (useRuntimeConfig().public?.githubRepo) || 'https://github.com/mohammadnajm/instant-image-converter'

const showQuality = computed(() => ['jpg', 'webp', 'avif'].includes(target.value))

// SEO head (per-page) + JSON-LD (بدون اسکریپت داخل template)
useHead({
  title: 'Online Image Converter | PNG ⇄ JPG, SVG → PNG/WEBP/AVIF',
  meta: [
    { name: 'description', content: 'Free online image converter. Convert PNG to JPG, JPG to PNG, SVG to PNG/JPG/WEBP/AVIF, and export WEBP or AVIF with adjustable quality. Privacy-friendly, fast, and SEO-ready.' },
    { name: 'keywords', content: 'image converter, png to jpg, jpg to png, svg to png, webp converter, avif converter, online converter' }
  ],
  script: [
    {
      type: 'application/ld+json',
      // IMPORTANT: use 'children' to inject JSON-LD text content
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Online Image Converter",
        "applicationCategory": "Multimedia",
        "operatingSystem": "Web",
        "description": "Convert PNG ⇄ JPG, rasterize SVG to PNG/JPG/WEBP/AVIF, and export to WEBP/AVIF fast.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      })
    }
  ]
})

// Helpers
function ext(name) {
  const m = name.split('.')
  return m.length > 1 ? m.pop() : ''
}
function prettySize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let n = bytes
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++ }
  return `${n.toFixed(n >= 10 || i === 0 ? 0 : 1)} ${units[i]}`
}
function statusLabel(s) {
  return s === 'idle' ? 'Idle'
    : s === 'uploading' ? 'Uploading'
      : s === 'processing' ? 'Processing'
        : s === 'done' ? 'Done'
          : 'Error'
}

function addFiles(newFiles) {
  const list = Array.from(newFiles).map(file => ({
    id: crypto.randomUUID(),
    file,
    previewUrl: URL.createObjectURL(file),
    status: 'idle',
    uploadPct: 0,
    processPct: 0,
    resultUrl: null
  }))
  files.value = [...files.value, ...list]
}

function clearAll() {
  files.value.forEach(f => {
    f.previewUrl && URL.revokeObjectURL(f.previewUrl)
    f.resultUrl && URL.revokeObjectURL(f.resultUrl)
  })
  files.value = []
}

async function convertAll() {
  if (!files.value.length) return
  isConverting.value = true
  for (const f of files.value) {
    if (f.status === 'done') continue
    await convertOne(f)
  }
  isConverting.value = false
}

function downloadResult(f) {
  if (!f.resultUrl) return
  const inferredName = f.file.name.replace(/\.[^.]*$/, '') || 'converted'
  const a = document.createElement('a')
  a.href = f.resultUrl
  a.download = `${inferredName}.${target.value}`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function retryOne(f) {
  f.status = 'idle'
  f.uploadPct = 0
  f.processPct = 0
  f.resultUrl && URL.revokeObjectURL(f.resultUrl)
  f.resultUrl = null
  convertOne(f)
}

/**
 * Precise UPLOAD progress via XHR; "Processing" animates until response, then becomes 100%.
 */
function convertOne(f) {
  return new Promise((resolve) => {
    const config = useRuntimeConfig()
    const url = `${config.public.apiBase}/api/convert`

    const fd = new FormData()
    fd.append('file', f.file)
    fd.append('target', target.value)
    if (showQuality.value) fd.append('quality', String(quality.value))

    const xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'

    let processTimer = null

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        f.status = 'uploading'
        f.uploadPct = Math.min(100, (e.loaded / e.total) * 100)
      }
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 2 || xhr.readyState === 3) {
        if (f.status !== 'processing') {
          f.status = 'processing'
          // Animate toward 95% while waiting
          processTimer = setInterval(() => {
            if (f.processPct < 95) f.processPct += 1
          }, 80)
        }
      }
    }

    xhr.onload = () => {
      if (processTimer) clearInterval(processTimer)
      if (xhr.status >= 200 && xhr.status < 300) {
        f.processPct = 100
        f.status = 'done'
        const blob = xhr.response
        f.resultUrl && URL.revokeObjectURL(f.resultUrl)
        f.resultUrl = URL.createObjectURL(blob)
      } else {
        f.status = 'error'
      }
      resolve()
    }

    xhr.onerror = () => {
      if (processTimer) clearInterval(processTimer)
      f.status = 'error'
      resolve()
    }

    xhr.open('POST', url, true)
    xhr.send(fd)
  })
}
// state
const heroRef = ref(null)
const showStickyHero = ref(false)

// observer: وقتی HERO از ویو خارج شد، نوار بالا رو نشان بده
onMounted(() => {
  const obs = new IntersectionObserver(([entry]) => {
    // اگر HERO دیده می‌شود => نوار بالا مخفی باشد
    showStickyHero.value = !entry.isIntersecting
  }, {
    // کمی زودتر فعال شود تا تجربه نرم‌تر باشد
    rootMargin: '-64px 0px 0px 0px',
    threshold: 0
  })
  if (heroRef.value) obs.observe(heroRef.value)

  onBeforeUnmount(() => obs.disconnect())
})

const totalConverted = ref(0)

function bumpCounterLocally(n = 1) {
  // اگر بک‌اند به هر دلیل در دسترس نبود، حداقل UI واکنشی نشان دهد
  totalConverted.value = Math.max(0, totalConverted.value + n)
}

async function fetchStats() {
  try {
    const config = useRuntimeConfig()
    const res = await fetch(`${config.public.apiBase}/api/stats`, { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      if (typeof data.totalConverted === 'number') totalConverted.value = data.totalConverted
      return
    }
    // اگر 404 بود، یعنی هنوز بک‌اند آپدیت نشده؛ چیزی نشون نمی‌دیم
  } catch (_) { }
}

function onConvertedSuccessfully() {
  bumpCounterLocally(1)
  // همچنین می‌تونی برای همگام‌سازی دقیق، بلافاصله دوباره fetchStats هم بزنی:
  fetchStats()
}
</script>

<style scoped>
/* Optional: subtle card shadow for glass effect if your Tailwind config doesn't have shadow-glass */
.shadow-glass {
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.35);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .18s ease, transform .18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
