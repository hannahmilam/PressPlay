<template>
  <div class="container-fluid">
    <div class="row mt-4">
      <div class="col-2 sidebar ps-4">
        <div class="row">
          <div class="text-center">
            <img :src="profile?.picture" height="100" class="rounded-circle" alt="">
          </div>
          <div>
            <h5>
              {{ profile?.name }}
            </h5>
          </div>
          <div>
            <p class="selectable btn" data-bs-toggle="modal" data-bs-target="#subscribers-modal">
              Followers: {{ subscribers?.length }}
            </p>
            <p class="selectable btn" data-bs-toggle="modal" data-bs-target="#subscribing-modal">
              Following: {{ subscribing?.length }}
            </p>
            <p class="selectable btn" data-bs-toggle="modal" data-bs-target="#projects-following-modal">
              Projects Following:{{ usersProjectsSubscriptions?.length }}
            </p>
          </div>
          <div v-if="profile?.id !== account?.id">
            <button @click="subscribeToUser()" v-if="myUserSubscribe.length > 0" class="btn btn-primary">
              Unfollow
            </button>
            <button @click="subscribeToUser()" v-else class="btn btn-danger">
              Follow
            </button>
          </div>
          <div>
            <p>Instruments</p>
            <p>{{ profile?.instrumentTags }}</p>
          </div>
          <div>
            <p>
              Genres
            </p>
            <p>
              {{ profile?.genreTags }}
            </p>
          </div>
          <div>
            <h5>
              About Me:
            </h5>
            <p>{{ profile?.bio }} </p>
          </div>
        </div>
      </div>
      <div class="col-10">
        <div class="row">
          <div class="col-6 m-auto">
            <form @submit.prevent="showHiddenProject()">
              <div class="form-group">
                <label for="name">Project Code</label>
                <input type="text"
                       class="form-control"
                       id="exampleFormControlInput1"
                       placeholder=""
                       v-model="query"
                       required
                >
              </div>
              <button class="btn btn-success mt-2" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div class="row">
          <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
        </div>
      </div>
    </div>
  </div>

  <Modal id="subscribers-modal">
    <template #modal-title>
      <h4>Followers</h4>
    </template>
    <template #modal-body>
      <div class="row">
        <Subscribers v-for="s in subscribers" :key="s.id" :subscriber="s" />
      </div>
    </template>
  </Modal>

  <Modal id="subscribing-modal">
    <template #modal-title>
      <h4>Following</h4>
    </template>
    <template #modal-body>
      <div class="row">
        <Subscribing v-for="s in subscribing" :key="s.id" :subscribing="s.subscribing" />
      </div>
    </template>
  </Modal>

  <Modal id="projects-following-modal">
    <template #modal-title>
      <h4>Followed Projects</h4>
    </template>
    <template #modal-body>
      <ProjectsFollowing v-for="p in usersProjectsSubscriptions" :key="p.id" :project="p.project" />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { profileSubscriptionsService } from '../services/ProfileSubscriptionsService'
import { profilesService } from '../services/ProfilesService'
import { router } from '../router'
export default {
  name: 'Profile',
  setup() {
    const query = ref('')
    const route = useRoute()
    onMounted(async() => {
      AppState.projects = []
    })

    return {
      query,
      profile: computed(() => AppState.currentProfile),
      projects: computed(() => AppState.projects.filter(p => p.password === null)),
      account: computed(() => AppState.account),
      hiddenProject: computed(() => AppState.projects.filter(p => p.password === query.value)),
      subscribers: computed(() => AppState.profileSubscribers),
      subscribing: computed(() => AppState.profileSubscriptions),
      usersProjectsSubscriptions: computed(() => AppState.projectSubscriptions),
      myUserSubscribe: computed(() => AppState.profileSubscribers.filter(s => s.subscriberId === AppState.account.id)),
      async showHiddenProject() {
        try {
          debugger
          router.push({
            name: 'Project',
            params: { projectId: this.hiddenProject[0].id }
          })
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async subscribeToUser() {
        try {
          if (this.myUserSubscribe.length > 0) {
            await profileSubscriptionsService.unsubscribeToUser(route.params.profileId, this.myUserSubscribe[0].id)
          } else {
            await profileSubscriptionsService.subscribeToUser(route.params.profileId)
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style>
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
