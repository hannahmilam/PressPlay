<template>
  <div class="container-fluid" v-if="projects.length === 0">
    <div class="row py-3 justify-content-center">
      <div class="col-6 text-center">
        <h3 class="txt">
          You don't have any projects yet
        </h3>
        <img src="../assets/img/microphone.png" class="img-fluid microphone" alt="">
      </div>
    </div>
  </div>
  <div class="container-fluid" v-else>
    <div class="row">
      <div class="col-6 m-auto pt-2">
        <form @submit.prevent="showHiddenProject()">
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   id="exampleFormControlInput1"
                   placeholder="Project Code"
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
    <div class="container">
      <div class="row">
        <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
      </div>
    </div>
  </div>
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
          router.push({
            name: 'Project',
            params: { projectId: this.hiddenProject[0].id }
          })
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
      // async subscribeToUser() {
      //   try {
      //     if (this.myUserSubscribe.length > 0) {
      //       await profileSubscriptionsService.unsubscribeToUser(route.params.profileId, this.myUserSubscribe[0].id)
      //     } else {
      //       await profileSubscriptionsService.subscribeToUser(route.params.profileId)
      //     }
      //   } catch (error) {
      //     Pop.toast(error, 'error')
      //   }
      // }
    }
  }
}
</script>

<style>
.contanier{
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.315);
}
.container-fluid{
  font-family: 'Scheherazade New', serif;
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
.track-list{
  height: 30rem;

}
.txt{
font-family: 'Scheherazade New', serif;
color: white;
}

.microphone{
transition: all 0.3s 0s ease-in;
}
.microphone:hover{
  transform: scale(1.1);
  transition: .5s;
}
</style>
