<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>{{ profile.name }}</h1>
        <img :src="profile.picture" alt="">
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <!-- TODO hannah is working on this  -->
            <Projects v-for="p in projects" :key="p.id" :project="p" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.profileId) {
        AppState.currentProfile = null
        try {
          await profilesService.getProfileById(route.params.profileId)
          await projectsService.getProjectsByProfileId(route.params.profileId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      profile: computed(() => AppState.currentProfile)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
