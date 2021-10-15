<template>
  <div class="col-10 m-auto">
    <div class="row">
      <ContributionCards v-for="c in contributions" :key="c.id" :contribution="c" />
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { contributionsService } from '../services/ContributionsService'
export default {
  name: 'Profile',
  setup() {
    return {
      profile: computed(() => AppState.currentProfile),
      projects: computed(() => AppState.projects),
      contributions: computed(() => AppState.contributions)
    }
  }
}
</script>
<style scoped>

</style>
