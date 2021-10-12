<template>
  <h1>
    <span v-if="currentProject.spotlightMp3 === contribution.contributionMp3" class="text-success">{{ contribution.title }}</span>
    <span v-else>{{ contribution.title }}</span>
    <span @click="setSpotlight()" v-if="currentProject.creatorId === account.id" class="">
      <i v-if="currentProject.spotlightMp3 === contribution.contributionMp3" class="selectable mdi text-success mdi-star-circle-outline"></i>
      <i v-else class="selectable mdi mdi-star-circle-outline"></i>
    </span>
  </h1>
  <button @click="removeContribution">
    Delete Contribution
  </button>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { Contribution } from '../models/Contribution'
import { contributionsService } from '../services/ContributionsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'

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
        if (await Pop.confirm()) {
          try {
            await contributionsService.removeContribution(props.contribution.id)
            Pop.toast('this has been removed')
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      },
      async setSpotlight() {
        try {
          await projectsService.setSpotlight(editable.value, this.currentProject.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
