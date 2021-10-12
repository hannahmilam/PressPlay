<template>
  <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable text-dark">
    <div class="card mx-3 p-3">
      <div class="row justify-content-between">
        <div class="col-2">
          <router-link :to="{name: 'Profile.Originals', params: {profileId: project.creatorId}}" class="selectable">
            <img :src="project.creator.picture" height="50" class="rounded img-f" alt="">
          </router-link>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col">
              <p class="p-0 m-0">
                <b>{{ project.name }}</b>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="p-0 m-0">
                {{ project.creator.name }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-4">
          <!-- <i class="mdi mdi-play f-20"></i> -->
          <audio :src="project.originalMp3" controls style="width: 100px"></audio>
        </div>
      </div>

      <div class="row">
        <div class="col-2 m-auto">
          <button @click="toggleSpotlight()" class="spotlight-button btn-project pb-0 mb-0">
            <p class="">
              Spotlight
              <i class="mdi mdi-play f-20 m-0 p-0" title="Play Spotlight" />
            </p>
          </button>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>

import { Project } from '../models/Project'

export default {
  props: {
    project: {
      type: Project, default: () => new Project()
    }
  },
  setup() {
    return {
      async toggleSpotlight() {

      }
      // projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  // border: 1px solid rgba(0, 0, 0, 0.041);
  border-radius: 15px;
  box-shadow: 0px 0px 6px #c027b856;
  // box-shadow: 0px 0px 6px #c027b8c4;
  background-color: rgba(255, 251, 251, 0.3);
  backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
  display: inline-block;
  width: 25rem;
}
.spotlight-button {
position: absolute;
transform: translateX(-20px);
border-radius: 40%;

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
.icon-down{
  position: absolute;
  transform: translateY(1px);
}

</style>
