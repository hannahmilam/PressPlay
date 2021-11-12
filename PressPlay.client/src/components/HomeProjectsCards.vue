<template>
  <div v-if="!project.password" class="col-md-3 text-center">
    <router-link
      :to="{ name: 'Project.Contributions', params: { projectId: project.id } }"
      class="selectable text-white"
    >
      <div
        class="card my-3 selectable"
        :style="{ backgroundImage: `url(${project.albumArt})` }"
      >
        <div class="card-footer">
          <div class="row justify-content-between">
            <div class="col-10">
              <router-link
                :to="{
                  name: 'Profile.Originals',
                  params: { profileId: project.creator.id },
                }"
                class="selectable text-white"
              >
                <h5 class="p-0 m-0 clip-text" :title="project.name">
                  <b>{{ project.name }}</b>
                </h5>
                <p :title="project.creator.name">
                  {{ project.creator.name }}
                </p>
              </router-link>
            </div>
            <div class="col-2">
              <i
                :id="'pause-' + project.id"
                class="fas fa-pause f-20 selectable"
                @click.stop="toggleAudio"
                v-if="currentSong.id === project.id && playing"
              ></i>
              <i
                :id="'play-' + project.id"
                class="fas fa-play f-20 selectable"
                @click.stop="setSource"
                v-else
              ></i>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
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
      playing: computed(() => AppState.playing),
      currentSong: computed(() => AppState.currentSong),
      setSource() {
        try {
          AppState.currentSong.src = props.project.spotlightMp3
          AppState.currentSong.id = props.project.id
          AppState.currentSong.albumArt = props.project.albumArt
          AppState.currentSong.name = props.project.name
          AppState.currentSong.creator = props.project.creator
          AppState.currentSong.creatorId = props.project.creatorId
          const currentSong = document.getElementById(props.project.id)
          // logger.log('current song, set source', AppState.currentSong)
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
          AppState.playing = true
          document.getElementById('album-art').classList.add('active')
        } else {
          currentSong.pause()
          AppState.playing = false
          document.getElementById('album-art').classList.remove('active')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
div.card {
  max-width: 300px;
  height: 300px;
  background-size: cover;
  text-align: left;
  transition: all 0.3s 0s ease-in;
  z-index: 1;
  box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
  border: none;
}
.card-footer {
  backdrop-filter: blur(10px);
  margin-top: 80%;
  background: linear-gradient(rgba(0, 0, 0, 0.473), rgba(0, 0, 0, 0.459));
}
.navbar .router-link-exact-active {
  border-bottom: 2px solid var(--bs-light);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.card:hover {
  transform: scale(1.05);
  transition: 0.5s;
}
</style>
