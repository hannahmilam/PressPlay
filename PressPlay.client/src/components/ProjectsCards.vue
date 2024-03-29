<template>
  <div class="col-md-10 col-sm-12 m-auto p-2 bg-dark text-light">
    <div class="row song-shadow">
      <div class="col-6 ps-0 ms-0">
        <div class="d-flex">
          <div>
            <router-link
              :to="{
                name: 'Project.Contributions',
                params: { projectId: project.id },
              }"
              class="selectable text-light"
            >
              <img :src="project.albumArt" height="50" width="50" alt="" />
            </router-link>
          </div>

          <div class="ps-3 d-flex align-self-end">
            <h4>{{ project.name }}</h4>
          </div>
        </div>
      </div>
      <div class="col-6 one-line">
        <div class="d-flex align-self-end">
          <small>
            <p>
              <strong> Contributions: {{ contributions.length }}</strong>
            </p>
          </small>
        </div>
        <div>
          <i
            :id="'pause-' + project.id"
            class="mdi mdi-pause f-20 selectable"
            @click.stop="toggleAudio"
            v-if="currentSong.id === project.id && playing"
          ></i>
          <i
            :id="'play-' + project.id"
            class="mdi mdi-play f-20 selectable"
            @click.stop="setSource"
            v-else
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { Project } from '../models/Project'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { contributionsService } from '../services/ContributionsService'
import { useRoute } from 'vue-router'

export default {
  props: {
    project: {
      type: Project, default: () => new Project()
    }
  },
  setup(props) {
    const route = useRoute()
    watchEffect(async () => {
      if (route.params.profileId) {
        AppState.contributions = []
        await contributionsService.getContributionsByProjectId(props.project.id)
      }
    })
    return {
      playing: computed(() => AppState.playing),
      currentSong: computed(() => AppState.currentSong),
      contributions: computed(() => AppState.contributions.filter(c => c.projectId === props.project.id)),
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
.card {
  border: 1px solid rgba(0, 0, 0, 0.041);
  border-radius: 15px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
  display: inline-block;
}
.small {
  height: 100px;
  width: 100px;
}
.short {
  height: 3rem;
}

.one-line {
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.col-line {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
.song-shadow {
  box-shadow: 0 4px 2px -2px rgba(128, 128, 128, 0.438);
}
</style>
