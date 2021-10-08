<template>
  <div v-if="profile">
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 bg-pink">
          <Sidebar />
        </div>

        <div class="col-10 bg-img">
          <div class="row">
            <div class="card bg-transparent">
              <div class="card-body">
                <div class="row">
                  <!-- TODO hannah is working on this  -->
                  <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
                </div>
              </div>
            </div>
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
        // AppState.projects = []
        try {
          await profilesService.getProfileById(route.params.profileId)
          await projectsService.getProjectsByProfileId(route.params.profileId)
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

<style lang="scss" scoped>
.bg-pink{
  background: white;
  height: 100vh;
}
.bg-img{
  background-image: url('https://images.unsplash.com/photo-1602292678572-16cb94ea0d88?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBqYXp6fGVufDB8MXwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: -70rem;
}
</style>
