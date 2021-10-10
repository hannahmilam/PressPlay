<template>
  <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable text-dark">
    <div class="card mx-3 p-3">
      <div class="row justify-content-between">
        <div class="col-2">
          <router-link :to="{name: 'Profile', params: {profileId: project.creatorId}}" class="selectable">
            <img :src="project.creator.picture" height="50" class="rounded img-f" alt="">
          </router-link>
        </div>
        <div class="col-8">
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
        <div class="col-2">
          <i class="mdi mdi-play f-20"></i>
        </div>
      </div>

      <div class="row">
        <p>Spotlight</p>
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

</style>
