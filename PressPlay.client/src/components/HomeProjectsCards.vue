<template>
  <div class="col-3 text-center">
    <div class="card my-3 selectable" style="width: 200px;">
      <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable text-dark">
        <div class="card-header p-0" style="height: 200px;">
          <img :src="project.creator.picture" class="rounded-top" height="198" alt="">
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
            <i :id="'pause-'+project.id" class="mdi mdi-pause f-20 selectable" @click.stop="toggleAudio"></i>
            <audio :id="project.id" controls class="visually-hidden" style="width: 100px"></audio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
      async setSource() {
        try {
          const foundAudioTag = document.getElementById(props.project.id)
          if (foundAudioTag.currentTime > 0) {
            this.toggleAudio()
          } else {
            foundAudioTag.src = props.project.spotlightMp3
            this.toggleAudio()
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      toggleAudio() {
        const foundAudio = document.getElementById(props.project.id)
        if (!foundAudio) {
          return logger.log('no audio element found')
        }

        if (foundAudio.paused) {
          foundAudio.play()
          document.getElementById(`pause-${props.project.id}`).classList.remove('visually-hidden')
          document.getElementById(`play-${props.project.id}`).classList.add('visually-hidden')
        } else {
          foundAudio.pause()
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
.card{
  height: 280px;
}
.card:hover{
   transform: scale(1.1);
    transition: .5s;
}
</style>
