<template>
  <ProjectPageCard />

  <header v-if="project">
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <div class="col-6 my-3" v-if="project.spotlightName !== null">
          <div class="card spotlight">
            <div class="row ms-2 pt-2">
              <small>CURRENT SPOTLIGHT</small>
              <div class="col-10">
                <h3>
                  {{ project.spotlightName }}
                </h3>
              </div>
              <div class="col-2">
                <!-- Spotlight Mp3 -->
                <i
                  :id="'pause-' + project.id"
                  class="fas fa-pause f-20 selectable"
                  @click.stop="toggleAudio"
                  v-if="currentSong.id === project.id && playing"
                ></i>
                <i
                  :id="'play-' + project.id"
                  class="fas fa-play f-20 selectable"
                  @click.stop="setSource"
                  v-else
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 button-stuff">
          <router-link :to="{ name: 'Project.Contributions' }">
            <li class="nav-link selectable text-uppercase text-light">
              Contributions: {{ contributions.length }}
            </li>
          </router-link>

          <router-link :to="{ name: 'Project.Comments' }">
            <li class="nav-link selectable text-uppercase text-light">
              Comments: {{ comments.length }}
            </li>
          </router-link>
        </div>
      </div>
    </div>
  </header>
  <header v-else>
    <h1 class="text-light">LOADING....</h1>
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
    watchEffect(async () => {
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
.button-stuff {
  display: flex;
  justify-content: space-around;
}
.spotlight {
  color: white;
  background: linear-gradient(120deg, #6559ae, #ff7159, #6559ae);
  background-size: 400% 400%;
  -webkit-background-clip: border;
  -webkit-text-fill-color: white;
  -moz-animation: gradient 3s ease-in-out infinite;
  -webkit-animation: gradient 3s ease-in-out infinite;
  animation: gradient 3s ease-in-out infinite;
}

@-moz-keyframes gradient {
  0% {
    background-position: 14% 0%;
  }
  50% {
    background-position: 87% 100%;
  }
  100% {
    background-position: 14% 0%;
  }
}
@-webkit-keyframes gradient {
  0% {
    background-position: 14% 0%;
  }
  50% {
    background-position: 87% 100%;
  }
  100% {
    background-position: 14% 0%;
  }
}
@keyframes gradient {
  0% {
    background-position: 14% 0%;
  }
  50% {
    background-position: 87% 100%;
  }
  100% {
    background-position: 14% 0%;
  }
}
@-moz-keyframes border {
  0% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      4px 66px,
      4px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  25% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      216px 66px,
      216px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  50% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      100% 0%,
      0% 0%
    );
  }
  75% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 0%,
      0% 0%
    );
  }
  100% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      0% 100%
    );
  }
}
@-webkit-keyframes border {
  0% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      4px 66px,
      4px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  25% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      216px 66px,
      216px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  50% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      100% 0%,
      0% 0%
    );
  }
  75% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 0%,
      0% 0%
    );
  }
  100% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      0% 100%
    );
  }
}
@keyframes border {
  0% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      4px 66px,
      4px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  25% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      216px 66px,
      216px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  50% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      100% 0%,
      0% 0%
    );
  }
  75% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 0%,
      0% 0%
    );
  }
  100% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      0% 100%
    );
  }
}
</style>
