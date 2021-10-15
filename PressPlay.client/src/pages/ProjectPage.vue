<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-10 m-auto">
          <div class="card">
            <div class="card-body">
              <div class="card-header">
                <button @click="removeProjectFromFirebase(account.id, project)" v-if="account.id === project.creatorId" class="btn btn-dark">
                  Delete Project
                </button>
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

        <div v-if="project.creatorId !== account?.id">
          <button @click="subscribeToProject()" v-if="myProjectSubscriptions.length > 0" class="btn btn-primary">
            Unfollow
          </button>
          <button @click="subscribeToProject()" v-else class="btn btn-danger">
            Follow
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 button-stuff">
          <router-link :to="{name: 'Project.Contributions'}">
            <button class="btn btn-primary">
              Contributions
            </button>
          </router-link>
          <router-link :to="{name: 'Project.Comments'}">
            <button class="btn btn-danger">
              Comments
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </header>

  <router-view />
  <footer>
    <Modal id="contribution-form">
      <template #modal-title>
        <h4>New Contribution</h4>
      </template>
      <template #modal-body>
        <ContributionForm :project="project" />
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
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { contributionsService } from '../services/ContributionsService'
import { commentsService } from '../services/CommentsService'
import { router } from '../router'
import { firebaseService } from '../services/FirebaseService'
export default {
  name: 'Project',
  setup() {
    const route = useRoute()
    onMounted(() => {
      AppState.project = {}
      AppState.contributions = []
      AppState.projectSubscriptions = []
      AppState.comments = []
    })
    watchEffect(async() => {
      if (route.params.projectId) {
        try {
          await projectsService.getProjectById(route.params.projectId)
          await contributionsService.getContributionsByProjectId(route.params.projectId)
          await projectsService.getSubscribers(route.params.projectId)
          await commentsService.getCommentsByProjectId(route.params.projectId)
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
      comments: computed(() => AppState.comments),
      profile: computed(() => AppState.profile),

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
      },
      async removeProject(accountId) {
        try {
          await projectsService.removeProject(route.params.projectId)
          router.push({
            name: 'Profile',
            params: { profileId: accountId }
          })
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async removeProjectFromFirebase(accountId, project) {
        if (await Pop.confirm()) {
          try {
            await firebaseService.delete(project.artName, 'Image', project.id, accountId)
            await this.removeProject(accountId)
          } catch (error) {
            Pop.toast(error, 'error')
          }
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
.button-stuff{
  display: flex;
  justify-content: space-around;
}

</style>
