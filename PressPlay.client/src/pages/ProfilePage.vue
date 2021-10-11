<template>
  <div v-if="profile">
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 bg-pink">
          <div class="row">
            <div class="text-center">
              <router-link :to="{name: 'Profile', params: {profileId: profile.id}}" class="btn selectable">
                <img :src="profile.picture" height="100" class="rounded-circle" alt="">
              </router-link>
            </div>
            <div>
              <h5>
                {{ profile.name }}
              </h5>
            </div>

            <div>
              <p>Instruments</p>
              <p>{{ profile.instrumentTags }}</p>
            </div>
            <div>
              <p>
                Genres
              </p>
              <p>
                {{ profile.genreTags }}
              </p>
            </div>
            <div>
              <h5>
                About Me:
              </h5>
              <p>{{ profile.bio }} </p>
            </div>
          </div>
        </div>

        <div class="col-10 bg-img">
          <div class="top-bar bg-black mt-4">
            <div class="col-12">
              <nav class="navbar navbar-expand-lg navbar-light bg-transparent justify-content-around">
                <router-link :to="{ name: 'Profile.Originals' }">
                  <li class="nav-link selectable text-uppercase text-light">
                    Originals
                  </li>
                </router-link>

                <router-link :to="{ name: 'Profile.Contributions', }">
                  <li class="nav-link selectable text-uppercase text-light">
                    Contributions
                  </li>
                </router-link>

                <button class="btn btn-project" data-bs-toggle="modal" data-bs-target="#project-form">
                  <b class="text-light">New Project</b>
                </button>
              </nav>
            </div>
          </div>
          <div class="row">
            <div class="card bg-transparent">
              <div class="card-body">
                <div class="row">
                  <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal id="project-form">
    <template #modal-title>
      <h4>New Project</h4>
    </template>
    <template #modal-body>
      <ProjectForm />
    </template>
  </Modal>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
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
          await profilesService.getProfileById(route.params.profileId)
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

<style lang="scss" scoped>
.bg-pink{
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
</style>
