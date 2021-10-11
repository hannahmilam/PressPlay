<template>
  <div class="row">
    <div class="card bg-transparent">
      <div class="card-body">
        <div class="row">
          <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
        </div>
      </div>
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
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.profileId) {
        AppState.currentProfile = null
        AppState.projects = []
        try {
          await projectsService.getProjectsByProfileId(route.params.profileId)
          await contributionsService.getContributions()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      profile: computed(() => AppState.currentProfile),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style>

</style>
