<template>
  <div class="col-3 text-center">
    <div class="card my-3 selectable" style="width: 200px;">
      <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable text-dark">
        <div class="card-header p-0">
          <img :src="project.albumArt" class="rounded-top img-fluid" height="198" alt="">
        </div>
      </router-link>
      <div class="card-body">
        <div class="row justify-content-between me-2 text-black">
          <div class="col-10">
            <h5 class="card-text p-0 m-0 clip-text" :title="project.name">
              <b>{{ project.name }}</b>
            </h5>
            <p class="card-text" :title="project.creator.name">
              {{ project.creator.name }}
            </p>
          </div>
          <div class="col-2">
            <i :id="'play-'+project.id" class="mdi mdi-play f-20 selectable" @click.stop="setSource"></i>
            <i :id="'pause-'+project.id" class="mdi mdi-pause visually-hidden f-20 selectable" @click.stop="toggleAudio"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'

import { Project } from '../models/Project'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props: {
    project: {
      type: Project, default: () => new Project()
    }
  },
  setup(props) {
    return {
      setSource() {
        try {
          if (AppState.currentSong.src) {
            document.getElementById(`pause-${AppState.currentSong.id}`).classList.add('visually-hidden')
            document.getElementById(`play-${AppState.currentSong.id}`).classList.remove('visually-hidden')
          }
          AppState.currentSong.src = props.project.spotlightMp3
          AppState.currentSong.id = props.project.id
          AppState.currentSong.albumArt = props.project.albumArt
          const currentSong = document.getElementById(props.project.id)
          logger.log('current song, set source', AppState.currentSong)
          if (AppState.currentSong.src) {
            setTimeout(() => this.toggleAudio(), 250)
          } else {
            currentSong.src = props.project.spotlightMp3
            this.toggleAudio()
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      toggleAudio() {
        const currentSong = document.getElementById(props.project.id)
        if (!currentSong) {
          return logger.log('no audio element found')
        }

        if (currentSong.paused) {
          currentSong.play()
          document.getElementById(`pause-${props.project.id}`).classList.remove('visually-hidden')
          document.getElementById(`play-${props.project.id}`).classList.add('visually-hidden')
        } else {
          currentSong.pause()
          document.getElementById(`pause-${props.project.id}`).classList.add('visually-hidden')
          document.getElementById(`play-${props.project.id}`).classList.remove('visually-hidden')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
div.card {
  background: white;
  display: inline-block;
  margin: 8px;
  max-width: 300px;
  perspective: 1000;
  position: relative;
  text-align: left;
  transition: all 0.3s 0s ease-in;
  width: 300px;
  z-index: 1;
}
.navbar .router-link-exact-active{
  border-bottom: 2px solid var(--bs-light);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.card:hover{
   transform: scale(1.1);
    transition: .5s;
}
</style>
