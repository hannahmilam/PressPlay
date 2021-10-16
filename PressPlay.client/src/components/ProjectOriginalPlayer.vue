<template>
  <div class="col-4 m-3">
    <div class="card">
      <div class="row">
        <small>Orginal Upload</small>
        <div class="col-10">
          <h3>
            {{ project.name }}
          </h3>
        </div>
        <div class="col-2">
          <!-- original Mp3 -->
          <i :id="'pause-'+project.id" class="mdi mdi-pause f-20 selectable" @click.stop="toggleAudio" v-if="currentSong.id === project.id && playing"></i>
          <i :id="'play-'+project.id" class="mdi mdi-play f-20 selectable" @click.stop="setSource" v-else></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
