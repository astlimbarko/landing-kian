<script>
export default {
  name: 'App'
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <Header />
    <main>
      <HeroSection class="pt-24" />
      <CurrencyCalculator class="py-12" />
      <ContactSection class="py-12" />
      <MissionVision class="py-12" />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import HeroSection from './components/HeroSection.vue'
import CurrencyCalculator from './components/CurrencyCalculator.vue'
import ContactSection from './components/ContactSection.vue'
import MissionVision from './components/MissionVision.vue'
import Footer from './components/Footer.vue'
import ScrollToTop from './components/ScrollToTop.vue'
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.container-custom {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-custom {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-custom {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
