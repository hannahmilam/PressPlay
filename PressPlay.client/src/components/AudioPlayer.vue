<template>
  <div v-if="currentSong.src">
    <audio :id="currentSong.id" controls :src="currentSong.src"> </audio>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  setup() {
    watchEffect(() => {
      if (AppState.currentSong.id !== null) {
        logger.log('audio player current song', AppState.currentSong)
      }
    })
    return {
      currentSong: computed(() => AppState.currentSong)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
