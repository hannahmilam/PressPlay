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
            Followers: {{ subscribers?.length }}
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
          <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { profileSubscriptionsService } from '../services/ProfileSubscriptionsService'
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    return {
      profile: computed(() => AppState.currentProfile),
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
      subscribers: computed(() => AppState.profileSubscribers),
      myUserSubscribe: computed(() => AppState.profileSubscribers.filter(s => s.subscriberId === AppState.account.id)),
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
