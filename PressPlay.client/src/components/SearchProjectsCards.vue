<template>
  <div class="row">
    <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable text-light">
      <div class="card m-2 p-2">
        <div class="one-line">
          <div class="col-3">
            <router-link :to="{name: 'Profile', params: {profileId: project.creatorId}}" class="selectable">
              <img :src="project.creator.picture" height="50" class="round img-f" alt="">
            </router-link>
            <div>
              <p class="p-0 m-0">
                {{ project.creator.name }}
              </p>
            </div>
          </div>
          <div class="col-4">
            <p class="p-0 m-0">
              <b>{{ project.name }}</b>
            </p>
          </div>
          <div class="col-2">
            <audio :src="project.originalMp3" controls style="width: 100px"></audio>
          </div>
          <div class="col-3">
            <p>Contributions: {{ contributions.length }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { Project } from '../models/Project'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { contributionsService } from '../services/ContributionsService'

export default {
  props: {
    project: {
      type: Project, default: () => new Project()
    }
  },
  setup(props) {
    return {
      contributions: computed(() => AppState.contributions.filter(c => c.projectId === props.project.id))
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  border: 1px solid rgba(0, 0, 0, 0.041);
  border-radius: 15px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);

}
.round{
  border-radius: 50%;
}
.one-line{
  display: flex;
  justify-content: space-between;
}

</style>
