<template>
  <div class="container">
    <div class="row">
      <div class="col-10">
        <div class="card">
          <div class="card-body">
            <div class="card-header">
              <h1>{{ project.name }}</h1>
              <div class="card-body">
                {{ project.description }}
              </div>
              <div class="card selectable d-flex small" data-bs-toggle="modal" data-bs-target="#followers-form">
                Followers: {{ projectSubs.length }}
              </div>
              <div v-if="project.spotlightName !== null">
                {{ project.spotlightName }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div v-if="project.creatorId !== account?.id">
          <button @click="subscribeToProject()" v-if="myProjectSubscriptions.length > 0" class="btn btn-primary">
            Unfollow
          </button>
          <button @click="subscribeToProject()" v-else class="btn btn-danger">
            Follow
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <button class="btn btn-project" data-bs-toggle="modal" data-bs-target="#contribution-form">
              <b class="text-light">New Contribution</b>
            </button>
          </div>
          <div class="card-body">
            <div v-if="contributions.length > 0">
              <ContributionsCards v-for="c in contributions" :key="c.id" :contribution="c" />
            </div>
            <div v-else>
              <p>
                Be The first contribution
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <Modal id="contribution-form">
      <template #modal-title>
        <h4>New Contribution</h4>
      </template>
      <template #modal-body>
        <ContributionForm />
      </template>
    </Modal>
    <Modal id="followers-form">
      <template #modal-title>
        <h4>Followers</h4>
      </template>
      <template #modal-body>
        <ProjectFollowers v-for="s in projectSubs" :key="s.id" :project-sub="s.profile" />
      </template>
    </Modal>
  </footer>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { contributionsService } from '../services/ContributionsService'
export default {
  name: 'Project',
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.projectId) {
        AppState.project = {}
        AppState.contributions = []
        // AppState.projectSubscriptions = []
        try {
          await projectsService.getProjectById(route.params.projectId)
          await contributionsService.getContributionsByProjectId(route.params.projectId)
          await projectsService.getSubscribers(route.params.projectId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      project: computed(() => AppState.project),
      contributions: computed(() => AppState.contributions),
      account: computed(() => AppState.account),
      projectSubs: computed(() => AppState.projectSubscriptions),

      myProjectSubscriptions: computed(() => AppState.projectSubscriptions.filter(s => s.profileId === AppState.account.id)),
      async subscribeToProject() {
        try {
          if (this.myProjectSubscriptions.length > 0) {
            await projectsService.unSubscribeToProject(route.params.projectId, this.myProjectSubscriptions[0].id)
          } else {
            await projectsService.subscribeToProject(route.params.projectId)
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.small {
  width: 85px;
}

</style>
