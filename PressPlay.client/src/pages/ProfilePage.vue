<template>
  <div class="container-fluid p-0" v-if="profile">
    <nav class="navbar top-bar bg-black navbar-expand-lg navbar-light bg-black justify-content-around">
      <router-link :to="{ name: 'Profile.Originals' }">
        <li class="nav-link selectable text-uppercase text-light">
          Originals {{ projects.length }}
        </li>
      </router-link>

      <router-link :to="{ name: 'Profile.Contributions', }">
        <li class="nav-link selectable text-uppercase text-light">
          Contributions {{ contributions.length }}
        </li>
      </router-link>

      <button class="btn btn-project" data-bs-toggle="modal" data-bs-target="#project-form">
        <b class="text-light">New Project</b>
      </button>
    </nav>
  </div>

  <Modal id="project-form">
    <template #modal-title>
      <h4>New Project</h4>
    </template>
    <template #modal-body>
      <ProjectForm />
    </template>
  </Modal>
  <router-view />
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { contributionsService } from '../services/ContributionsService'
import { profileSubscriptionsService } from '../services/ProfileSubscriptionsService'
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    onMounted(() => {
      AppState.currentProfile = null
      AppState.projects = []
      AppState.profileSubscribers = []
    })
    watchEffect(async() => {
      if (route.params.profileId) {
        try {
          await profilesService.getProfileById(route.params.profileId)
          await projectsService.getProjectsByProfileId(route.params.profileId)
          await contributionsService.getContributionsByProfileId(route.params.profileId)
          await profileSubscriptionsService.getSubscribersByProfileId(route.params.profileId)
          await profileSubscriptionsService.getSubscriptionsByProfileId(route.params.profileId)
          await projectsService.getFollowedProjectsByProfileId(route.params.profileId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      profile: computed(() => AppState.currentProfile),
      projects: computed(() => AppState.projects),
      contributions: computed(() => AppState.contributions)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar{
  background: white;
  height: 100vh;
}
.bg-img{
  background-image: url('https://images.unsplash.com/photo-1602292678572-16cb94ea0d88?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBqYXp6fGVufDB8MXwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
.btn-project{
background: linear-gradient(90deg, #CB369E, #1D2EF7);
transition: .5;
}
:hover.btn-project{
background: linear-gradient(90deg, #1D2EF7, #CB369E);
transition: .5;
}
.top-bar{
   box-shadow: 0 4px 2px -2px rgba(243, 233, 233, 0.438);
}

.nav-link:hover{
  transform: translateY(-10%);
  font-weight: 500;
}
.navbar .router-link-exact-active{
  border-bottom: 2px solid var(--bs-light);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
