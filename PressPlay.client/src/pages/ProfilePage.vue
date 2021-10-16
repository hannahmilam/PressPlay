<template>
  <header>
    <div class="container-fluid bg-dark text-light text-center">
      <div class="row tall img-fill" :style="{'backgroundImage':`url(${profile.coverImg})` }">
        <div class="profile-name pt-3">
          <img :src="profile.picture" style="height: 100px; width: 100px;  " class="rounded-circle" alt="">
        </div>
        <div class="profile-name">
          <div class="my-text">
            <h1>
              {{ profile.name }}
            </h1>
            <br>
          </div>
          <div class="text-light" v-if="profile?.id !== account?.id">
            <a @click="subscribeToUser()" v-if="myUserSubscribe.length > 0" class="selectable">
              Unfollow
            </a>
            <a @click="subscribeToUser()" v-else class="selectable">
              Follow
            </a>
          </div>
        </div>
        <div class="profile-name text-light">
          <div class="p-1">
            <button class="selectable btn btn-dark text-light" data-bs-toggle="modal" data-bs-target="#subscribers-modal">
              Followers: {{ subscribers?.length }}
            </button>
          </div>
          <div class="p-1">
            <button class="selectable btn btn-dark text-light" data-bs-toggle="modal" data-bs-target="#subscribing-modal">
              Following: {{ subscribing?.length }}
            </button>
          </div>
          <div class="p-1">
            <button class="selectable btn btn-dark text-light" data-bs-toggle="modal" data-bs-target="#projects-following-modal">
              Projects Following:{{ usersProjectsSubscriptions?.length }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="profile">
        <nav class="navbar top-bar bg-dark text-light navbar-light bg-dark text-light justify-content-around">
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
    </div>
  </header>
  <router-view />
  <div class="container-fluid text-light d-flex justify-content-center">
    <div class="col-10 mt-5">
      <div class="card p-3">
        <div class="row">
          <div class="col-6">
            <h5 v-if="profile.instrumentTags">
              Instruments:
            </h5>
            <p>{{ profile.instrumentTags }}</p>
          </div>

          <div class="col-6">
            <h3 v-if="profile.genreTags">
              Genres:
            </h3>
            <p>
              {{ profile?.genreTags }}
            </p>
          </div>
        </div>
        <div>
          <h5>
            About Me:
          </h5>
          <p>{{ profile?.bio }} </p>
        </div>
        <footer>
          <div class="short"></div>
        </footer>
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
      // AppState.currentProfile = null
      // AppState.projects = []
      // AppState.profileSubscribers = []
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
      account: computed(() => AppState.account),
      subscribers: computed(() => AppState.profileSubscribers),
      subscribing: computed(() => AppState.profileSubscriptions),
      contributions: computed(() => AppState.contributions),
      usersProjectsSubscriptions: computed(() => AppState.projectSubscriptions),
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

<style lang="scss" scoped>
.img-fill{
  background-size: cover;
  background-repeat: no-repeat;
}
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
.tall{
  height: 15rem;
}
.short{
  height: 4rem;
}
.profile-name{
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.my-text {
color:aliceblue;
// -webkit-text-stroke-width:.5px;
// -webkit-text-stroke-color: black;
text-shadow: 2px 2px 4px #000000;
}
.card{
  background-color: #e55dd54b;
}

</style>
