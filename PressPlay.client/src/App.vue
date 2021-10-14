<template>
  <header>
    <Navbar />
  </header>
  <main class="bg-white">
    <router-view />
  </main>
  <footer class="bg-white">
    <AudioPlayer />
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
footer{
  height: 10rem;
  background: radial-gradient(circle, #F963EA, #493240);
}
</style>
