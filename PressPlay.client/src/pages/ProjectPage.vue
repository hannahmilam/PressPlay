<template>
  <header v-if="project">
    <div class="container-fluid">
      <div class="row">
        <div class="col-11 m-auto">
          <div class="card">
            <div class="row g-0">
              <div class="col-5">
                <img class="img-fluid" :src="project.albumArt" alt="">
              </div>
              <div class="col-7 d-flex align-items-end">
                <div class="card-body ">
                  <div class="card-header">
                    <h1 class="d-flex justify-content-between">
                      <span>{{ project.name }}</span>
                      <span>
                        <button @click="removeProjectFromFirebase(account.id, project)" v-if="account.id === project.creatorId" class="btn btn-dark">
                          <i class="mdi mdi-close"></i> Delete Project
                        </button>
                      </span>
                    </h1>
                    <div class="card-body">
                      <h5>{{ project.description }}</h5>
                    </div>
                    <div>
                      <span>
                        <img class="rounded-circle" :src="project.creator?.picture" style="height: 50px" alt="">
                      </span>
                      <span>
                        <b>{{ project.creator?.name }}</b>
                      </span>

                      <span data-bs-toggle="modal" data-bs-target="#followers-form">
                        Followers: {{ projectSubs?.length }}
                      </span>
                      <span v-if="project.creatorId !== account?.id" class="px-3">
                        <button @click="subscribeToProject()" v-if="myProjectSubscriptions.length > 0" class="btn btn-danger">
                          Unfollow
                        </button>
                        <button @click="subscribeToProject()" v-else class="btn btn-primary">
                          Follow
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-around">
        <div class="col-4 m-3">
          <div class="card">
            <div class="row">
              <small>Orginal Upload</small>
              <div class="col-10">
                <h3>
                  {{ project.name }}
                </h3>
              </div>
              <div class="col-2">
                <!-- original Mp3 -->
                <i :id="'pause-'+project.id" class="mdi mdi-pause f-20 selectable" @click.stop="toggleAudio" v-if="currentSong.id === project.id && playing"></i>
                <i :id="'play-'+project.id" class="mdi mdi-play f-20 selectable" @click.stop="setOriginalSource" v-else></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 m-3" v-if="project.spotlightName !== null">
          <div class="card">
            <div class="row">
              <small>Current Spotlight</small>
              <div class="col-10">
                <h3>
                  {{ project.spotlightName }}
                </h3>
              </div>
              <div class="col-2">
                <!-- Spotlight Mp3 -->
                <i :id="'pause-'+project.id" class="mdi mdi-pause f-20 selectable" @click.stop="toggleAudio" v-if="currentSong.id === project.id && playing"></i>
                <i :id="'play-'+project.id" class="mdi mdi-play f-20 selectable" @click.stop="setSource" v-else></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 button-stuff">
          <router-link :to="{name: 'Project.Contributions'}">
            <li class="nav-link selectable text-uppercase text-light">
              Contributions {{ contributions.length }}
            </li>
          </router-link>

          <router-link :to="{name: 'Project.Comments'}">
            <li class="nav-link selectable text-uppercase text-light">
              Comments {{ comments.length }}
            </li>
          </router-link>
        </div>
      </div>
    </div>
  </header>
  <header v-else>
    <h1 class="text-light">
      LOADING....
    </h1>
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
        <ProjectFollowers v-for="s in projectSubs" :key="s.id" :projectsub="s.profile" />
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
import { logger } from '../utils/Logger'
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
      currentSong: computed(() => AppState.currentSong),
      playing: computed(() => AppState.playing),
      contributions: computed(() => AppState.contributions),
      account: computed(() => AppState.account),
      projectSubs: computed(() => AppState.projectSubscriptions),
      comments: computed(() => AppState.comments),
      profile: computed(() => AppState.profile),
      setOriginalSource() {
        try {
          AppState.currentSong.src = AppState.project.originalMp3
          AppState.currentSong.id = AppState.project.id
          AppState.currentSong.albumArt = AppState.project.albumArt
          AppState.currentSong.name = AppState.project.name
          AppState.currentSong.creator = AppState.project.creator
          AppState.currentSong.creatorId = AppState.project.creatorId
          const currentSong = document.getElementById(AppState.project.id)
          // logger.log('current song, set source', AppState.currentSong)
          if (AppState.currentSong.src) {
            setTimeout(() => this.toggleAudio(), 250)
          } else {
            currentSong.src = AppState.project.spotlightMp3
            this.toggleAudio()
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },

      setSource() {
        try {
          AppState.currentSong.src = AppState.project.spotlightMp3
          AppState.currentSong.id = AppState.project.id
          AppState.currentSong.albumArt = AppState.project.albumArt
          AppState.currentSong.name = AppState.project.name
          AppState.currentSong.creator = AppState.project.creator
          AppState.currentSong.creatorId = AppState.project.creatorId
          const currentSong = document.getElementById(AppState.project.id)
          // logger.log('current song, set source', AppState.currentSong)
          if (AppState.currentSong.src) {
            setTimeout(() => this.toggleAudio(), 250)
          } else {
            currentSong.src = AppState.project.spotlightMp3
            this.toggleAudio()
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      toggleAudio() {
        const currentSong = document.getElementById(AppState.project.id)
        if (!currentSong) {
          return logger.log('no audio element found')
        }

        if (currentSong.paused) {
          currentSong.play()
          AppState.playing = true
          document.getElementById('album-art').classList.add('active')
        } else {
          currentSong.pause()
          AppState.playing = false
          document.getElementById('album-art').classList.remove('active')
        }
      },

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
            name: 'Profile.Orginals',
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
