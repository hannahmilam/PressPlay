<template>
  <div class="row justify-content-between p-2">
    <div class="col-4">
      <router-link
        :to="{
          name: 'Profile.Originals',
          params: { profileId: contribution?.id },
        }"
        class="selectable text-dark"
      >
        <img
          class="contribution-picture"
          :src="contribution.collaborator?.picture"
          alt=""
        />
      </router-link>
    </div>
    <div class="col-6">
      <h5>
        <span
          v-if="currentProject.spotlightMp3 === contribution.contributionMp3"
          >{{ contribution.title }}</span
        >
        <span v-else>{{ contribution.title }}</span>
      </h5>
    </div>
    <div class="col-1">
      <span
        @click="setSpotlight()"
        v-if="currentProject.creatorId === account.id"
      >
        <i
          v-if="currentProject.spotlightMp3 === contribution.contributionMp3"
          title="Set to Spotlight"
          class="selectable mdi mdi-star-circle-outline"
        ></i>
        <i
          v-else
          title="Set to Spotlight"
          class="selectable mdi mdi-star-circle-outline"
        ></i>
      </span>
      <i
        :id="'pause-' + contribution.id"
        class="fas fa-pause selectable"
        @click.stop="toggleAudio"
        v-if="currentSong.id === contribution.id && playing"
      ></i>
      <i
        :id="'play-' + contribution.id"
        class="fas fa-play selectable"
        @click.stop="setSource"
        v-else
      ></i>
    </div>
    <div class="col-1">
      <button
        v-if="contribution.acccountId === account.id"
        @click="deleteFirebaseContribution"
      >
        Delete Contribution
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { Contribution } from '../models/Contribution'
import { contributionsService } from '../services/ContributionsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import { firebaseService } from '../services/FireBaseService'
import { logger } from '../utils/Logger'

export default {
  props: {
    contribution: {
      type: Contribution,
      default: () => new Contribution()
    }
  },
  setup(props) {
    const editable = ref({ spotlightMp3: props.contribution.contributionMp3, spotlightName: props.contribution.title })
    return {
      project: computed(() => AppState.project),
      currentSong: computed(() => AppState.currentSong),
      playing: computed(() => AppState.playing),
      contributions: computed(() => AppState.contributions.filter(c => c.projectId === props.project.id)),
      account: computed(() => AppState.account),
      projectSubs: computed(() => AppState.projectSubscriptions),
      comments: computed(() => AppState.comments),
      profile: computed(() => AppState.profile),
      editable,
      currentProject: computed(() => AppState.project),

      async removeContribution() {
        try {
          await contributionsService.removeContribution(props.contribution.id)
          Pop.toast('this has been removed')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async setSpotlight() {
        try {
          await projectsService.setSpotlight(editable.value, this.currentProject.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deleteFirebaseContribution() {
        if (await Pop.confirm()) {
          try {
            await firebaseService.delete(props.contribution.fileName, 'Audio', AppState.project.id, AppState.account.id)
            await this.removeContribution()
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      },
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

<style lang="scss" scoped>
.contribution-picture {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.set-inline {
  display: flex;
  justify-content: space-between;
}
.contributions-shadow {
  box-shadow: 0 4px 2px -2px rgba(128, 128, 128, 0.438);
}
</style>
