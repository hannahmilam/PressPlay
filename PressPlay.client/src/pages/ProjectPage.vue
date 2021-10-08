<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="card-header">
              <h1>{{ project.name }}</h1>
              <div class="card-body">
                {{ project.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
          </div>
          <div class="card-body">
            <h1>this is where contributions go</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
export default {
  name: 'Project',
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.projectId) {
        AppState.project = {}
        try {
          await projectsService.getProjectById(route.params.projectId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      project: computed(() => AppState.project)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
