<template>
  <div class="col-6 my-3 d-flex">
    <div>
      <router-link :to="{name: 'Project', params: {projectId: contribution.projectId}}" class="selectable text-light ">
        <img :src="contribution.project.albumArt" height="50" width="50" alt="">
      </router-link>
    </div>
    <div class="ps-3">
      Project:
      <h5>
        {{ contribution.project.name }}
      </h5>
    </div>
  </div>

  <div class="col-6 d-flex">
    <div>
      <b>{{ contribution.title }}</b>
    </div>
    <div class="">
      <div>
        <i :id="'pause-'+contribution.id" class="mdi mdi-pause f-20 selectable" @click.stop="toggleAudio" v-if="currentSong.id === contribution.id && playing"></i>
        <i :id="'play-'+contribution.id" class="mdi mdi-play f-20 selectable" @click.stop="setSource" v-else></i>
      </div>
    </div>
  </div>

  <!-- <i class="mdi mdi-play f-20"></i> -->
</template>

<script>
import { Contribution } from '../models/Contribution'
import { computed } from '@vue/runtime-core'
import { Project } from '../models/Project'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'

export default {
  props: {
    contribution: {
      type: Contribution, default: () => new Contribution()
    }
  },
  setup(props) {
    return {
      playing: computed(() => AppState.playing),
      currentSong: computed(() => AppState.currentSong),
      contributions: computed(() => AppState.contributions.filter(c => c.projectId === props.project.id)),
      setSource() {
        try {
          AppState.currentSong.src = props.contribution.contributionMp3
          AppState.currentSong.id = props.contribution.id
          AppState.currentSong.albumArt = props.contribution.project.albumArt
          AppState.currentSong.name = props.contribution.title
          AppState.currentSong.creator = props.contribution.project
          AppState.currentSong.creatorId = props.contribution.creatorId
          const currentSong = document.getElementById(props.contribution.id)
          // logger.log('current song, set source', AppState.currentSong)
          if (AppState.currentSong.src) {
            setTimeout(() => this.toggleAudio(), 250)
          } else {
            currentSong.src = props.contribution.contributionMp3
            this.toggleAudio()
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      toggleAudio() {
        const currentSong = document.getElementById(props.contribution.id)
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
.show-inline{
  display: flex;
  justify-content: space-between;
}
.front{
  display: flex;
  justify-content: space-between;
}
.back{
  display: flex;
  align-self: flex-start;
}
  .one-line{

  justify-content: flex-end;

}

</style>
