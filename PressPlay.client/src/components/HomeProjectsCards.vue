<template>
  <div class="col-3 text-center">
    <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable text-dark">
      <div class="card my-3" style="width: 200px;">
        <div class="card-header p-0" style="height: 200px;">
          <img :src="project.creator.picture" class="rounded-top" height="198" alt="">
        </div>
        <div class="card-body">
          <div class="row justify-content-between me-2">
            <div class="col-10">
              <h5 class="card-text p-0 m-0 clip-text" :title="project.name">
                <b>{{ project.name }}</b>
              </h5>
              <p class="card-text" :title="project.creator.name">
                {{ project.creator.name }}
              </p>
            </div>
            <div class="col-2">
              <i class="mdi mdi-play f-20 selectable"></i>
              <!-- <audio :src="project.originalMp3" controls style="width: 100px"></audio> -->
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
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
div.card {
  background: white;
  display: inline-block;
  margin: 8px;
  max-width: 300px;
  perspective: 1000;
  position: relative;
  text-align: left;
  transition: all 0.3s 0s ease-in;
  width: 300px;
  z-index: 1;
}
.navbar .router-link-exact-active{
  border-bottom: 2px solid var(--bs-light);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.card{
  height: 280px;
}
.card:hover{
   transform: scale(1.1);
    transition: .5s;
}
</style>
