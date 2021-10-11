<template>
  <div class="col-md-4 my-3">
    <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable text-light">
      <div class="card mx-3 p-3">
        <div class="row justify-content-between">
          <div class="col-2">
            <router-link :to="{name: 'Profile', params: {profileId: project.creatorId}}" class="selectable">
              <img :src="project.creator.picture" height="50" class="rounded img-f" alt="">
            </router-link>
          </div>
          <div class="col-md-6">
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
          <div class="col-md-4">
            <!-- <i class="mdi mdi-play f-20"></i> -->
            <audio :src="project.originalMp3" controls style="width: 100px"></audio>
          </div>
        </div>
        <small>
          <p>Contributions: {{ contributions.length }}</p>
        </small>
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
    // watchEffect(async() => {
    //   if (props.project) {
    //     try {
    //       await contributionsService.getContributionsByProjectId
    //     } catch (error) {
    //       Pop.toast(error, 'error')
    //     }
    //   }
    // })
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
  display: inline-block;
}

</style>
