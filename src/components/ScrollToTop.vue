<template>
  <button 
    @click="scrollToTop" 
    class="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl z-50"
    :class="{ 'opacity-0': !showButton }"
  >
    <i class="fas fa-arrow-up text-xl"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
button {
  transition: opacity 0.3s ease-in-out;
}
</style> 