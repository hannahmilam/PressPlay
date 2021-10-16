<template>
  <div class="set-inline p-2 contributions-shadow">
    <div>
      <router-link :to="{name: 'Profile.Originals', params: {profileId: contribution.collaborator.id}}" class="selectable text-dark">
        <img class="contribution-picture" :src="contribution.collaborator.picture" alt="">
      </router-link>
    </div>
    <div>
      <h5>
        <span v-if="currentProject.spotlightMp3 === contribution.contributionMp3" class="text-success">{{ contribution.title }}</span>
        <span v-else>{{ contribution.title }}</span>
        <span @click="setSpotlight()" v-if="currentProject.creatorId === account.id" class="">
          <i v-if="currentProject.spotlightMp3 === contribution.contributionMp3" title="Set to Spotlight" class="selectable mdi text-success mdi-star-circle-outline"></i>
          <i v-else title="Set to Spotlight" class="selectable mdi mdi-star-circle-outline"></i>
        </span>
      </h5>
    </div>
    <div>
      <button v-if="contribution.acccountId === account.id" @click="deleteFirebaseContribution">
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

export default {
  props: {
    contribution: {
      type: Contribution,
      required: true
    }
  },
  setup(props) {
    const editable = ref({ spotlightMp3: props.contribution.contributionMp3, spotlightName: props.contribution.title })
    return {
      editable,
      currentProject: computed(() => AppState.project),
      account: computed(() => AppState.account),
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contribution-picture{
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.set-inline{
  display: flex;
  justify-content: space-between;
}
.contributions-shadow{
  box-shadow: 0 4px 2px -2px rgba(128, 128, 128, 0.438);
}

</style>
