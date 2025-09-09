<template>
  <div
    class="group border border-white/10 rounded-2xl p-8 text-center transition-all bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:shadow-glass"
    :class="dragOver ? 'ring-1 ring-indigo-400/30' : ''"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
  >
    <div class="space-y-3">
      <div class="text-xl font-semibold">Drag & drop your files</div>
      <div class="text-sm text-white/70">or</div>
      <div>
        <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white cursor-pointer shadow hover:brightness-110 active:scale-[.98] transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M3 3a1 1 0 0 1 1-1h6a1 1 0 0 1 .707.293l6 6A1 1 0 0 1 17 9h-4a2 2 0 0 1-2-2V3H4a1 1 0 0 1-1-1Z"/><path d="M3 7a2 2 0 0 1 2-2h4v2a4 4 0 0 0 4 4h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>
          <span>Choose files</span>
          <input type="file" multiple class="hidden" @change="onInput" accept="image/*,.svg" />
        </label>
      </div>
      <p class="text-xs text-white/60">Supported: PNG, JPG, WEBP, AVIF, SVG</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: 'files', files: File[]): void }>()
const dragOver = ref(false)

function onDragOver() { dragOver.value = true }
function onDragLeave() { dragOver.value = false }
function onDrop(e: DragEvent) {
  dragOver.value = false
  const dt = e.dataTransfer
  if (!dt) return
  const files = Array.from(dt.files || []).filter(f => !!f)
  emit('files', files as File[])
}
function onInput(e: Event) {
  const input = e.target as HTMLInputElement
  const files = input.files ? Array.from(input.files) : []
  emit('files', files)
  if (input) input.value = ''
}
</script>
