<template>
  <div class="container-fluid">
    <div class="row mt-5 justify-content-center">
      <div class="header col-10 d-flex flex-column justify-content-center">
        <div class="content">
          <div class="content__middle">
            <div class="artist">
              <div
                class="artist__header"
                :style="{ backgroundImage: `url(${project.albumArt})` }"
              >
                <div class="artist__info">
                  <div class="profile__img">
                    <router-link
                      :to="{
                        name: 'Profile.Originals',
                        params: { profileId: project.creator?.id },
                      }"
                    >
                      <img
                        :src="project.creator?.picture"
                        alt="profile picture"
                      />
                    </router-link>
                  </div>

                  <div class="artist__info__meta">
                    <div class="artist__info__type">Artist</div>
                    <router-link
                      :to="{
                        name: 'Profile.Originals',
                        params: { profileId: project.creator?.id },
                      }"
                    >
                      <div class="artist__info__name">
                        {{ project.creator?.name }}
                      </div>
                    </router-link>
                    <div class="artist__info__actions">
                      <button
                        class="button-dark"
                        :id="'pause-' + project.id"
                        @click.stop="toggleAudio"
                        v-if="currentSong.id === project.id && playing"
                      >
                        <i class="ion-ios-play"></i>
                        Pause
                      </button>
                      <button
                        class="button-dark"
                        v-else
                        :id="'play-' + project.id"
                        @click.stop="setOriginalSource"
                      >
                        <i
                          class="ion-ios-play"
                          :id="'pause-' + project.id"
                          @click.stop="toggleAudio"
                          v-if="currentSong.id === project.id && playing"
                        ></i>
                        Play
                      </button>
                      <div v-if="user.isAuthenticated === true">
                        <button
                          class="button-light"
                          @click="subscribeToProject"
                          v-if="myProjectSubscriptions.length > 0"
                        >
                          Unfollow
                        </button>
                        <button
                          class="button-light"
                          @click="subscribeToProject"
                          v-else
                        >
                          Follow
                        </button>
                      </div>
                      <button
                        @click="removeProjectFromFirebase(account.id, project)"
                        v-if="account.id === project.creatorId"
                        class="button-light"
                      >
                        <i class="mdi mdi-close"></i> Delete Project
                      </button>
                    </div>
                  </div>
                </div>

                <div class="artist__listeners">
                  <div class="artist__listeners__count">
                    <b>
                      {{ projectSubs.length }}
                    </b>
                  </div>

                  <div class="artist__listeners__label">
                    <span
                      class="selectable"
                      data-bs-toggle="modal"
                      data-bs-target="#followers-form"
                    >
                      <b> PROJECT FOLLOWERS </b>
                    </span>
                  </div>
                </div>
              </div>

              <div class="artist__content">
                <div class="tab-content">
                  <div
                    role="tabpanel"
                    class="tab-pane active"
                    id="artist-overview"
                  >
                    <div class="overview"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal id="followers-form">
    <template #modal-title>
      <h4>Followers</h4>
    </template>
    <template #modal-body>
      <ProjectFollowers v-for="s in projectSubs" :key="s.id" :projectsub="s" />
    </template>
  </Modal>
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
      user: computed(() => AppState.user),
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

<style>
.artist {
  overflow-y: scroll;
  padding: 20px 30px;
}
.artist__header {
  height: 320px;
  border-bottom: 1px solid #282828;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-end;
  box-shadow: 0 14px 28px rgba(156, 153, 153, 0.25),
    0 10px 10px rgba(170, 168, 168, 0.22);
}
.artist__header:before {
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.15;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
}
.artist__header .artist__info {
  padding: 15px;
  z-index: 1;
  width: 80%;
  margin-top: 78px;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
}
.artist__header .artist__info .profile__img {
  margin-right: 15px;
}
.artist__header .artist__info .profile__img img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.artist__header .artist__info__type {
  color: white;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1px;
  text-shadow: rgb(10, 8, 1) 1px 0 4px;
}
.artist__header .artist__info__name {
  color: white;
  font-size: 36px;
  font-weight: 100;
  padding: 0 0 10px 0;
  text-shadow: rgb(10, 8, 1) 1px 0 4px;
}
.artist__header .artist__info__actions {
  display: flex;
  flex-flow: row wrap;
}
.artist__header .artist__info__actions button {
  margin-right: 10px;
  height: 27px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 0 15px;
  font-weight: 500;
}
.artist__header .artist__info__actions button i {
  font-size: 20px;
  margin-right: 5px;
}
.artist__header .artist__info__actions .more {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  padding: 0;
  text-align: center;
}
.artist__header .artist__info__actions .more i {
  margin: 0;
  padding-left: 6px;
}
.artist__header .artist__listeners {
  width: 20%;
  z-index: 1;
  padding: 15px;
  text-align: right;
  color: white;
  text-shadow: rgb(10, 8, 1) 1px 0 4px;
  font-weight: 100;
  font-size: 20px;
  letter-spacing: 1px;
}
.artist__header .artist__listeners__label {
  font-weight: 300;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 1px;
}
.artist__header .artist__navigation {
  width: 100%;
  z-index: 1;
  background: rgba(24, 24, 24, 0.6);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}
.artist__header .artist__navigation ul {
  border: none;
}
.artist__header .artist__navigation ul li {
  padding: 0 15px;
}
.artist__header .artist__navigation ul li a {
  padding: 15px 0;
  color: #aaaaaa;
  border: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.4s ease;
  border-bottom: 4px solid rgba(0, 0, 0, 0);
}
.artist__header .artist__navigation ul li a:hover {
  background: none;
  border: none;
  color: white;
  transition: all 0.4s ease;
  border-bottom: 4px solid rgba(0, 0, 0, 0);
}
.artist__header .artist__navigation ul li.active a {
  color: white;
  background: none;
  border: none;
  border-bottom: 4px solid #1ed760;
}
.artist__header .artist__navigation ul li.active a:hover {
  border-bottom: 4px solid #1ed760;
}
.artist__header .artist__navigation__friends {
  padding: 15px;
}
.artist__header .artist__navigation__friends img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
}
.artist__header .artist__navigation__friends .tooltip {
  z-index: 1;
  position: absolute;
}
.artist__content {
  padding: 15px;
}
.artist__content .overview {
  display: flex;
  flex-flow: row wrap;
}
.artist__content .overview__artist {
  padding-right: 15px;
  width: 70%;
}
.artist__content .overview__artist .latest-release {
  margin-bottom: 30px;
  display: flex;
  flex-flow: row wrap;
}
.artist__content .overview__artist .latest-release__art {
  width: 75px;
}
.artist__content .overview__artist .latest-release__art img {
  width: 75px;
  height: 75px;
}
.artist__content .overview__artist .latest-release__song {
  width: calc(100% - 75px);
  padding: 10px 15px;
  background: #282828;
  color: #aaaaaa;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
}
.artist__content .overview__artist .latest-release__song__title {
  color: #c8c8c8;
}
.artist__content .overview__related {
  width: 30%;
}
@media (max-width: 1024px) {
  .artist__content .overview__artist {
    width: 100%;
  }
  .artist__content .overview__related {
    width: 100%;
    margin-top: 15px;
  }
}
@media (max-width: 768px) {
  .artist__content .overview__artist {
    padding-right: 0;
  }
}

@media (max-width: 768px) {
  .artist {
    overflow-y: auto;
  }
}
@media (max-width: 522px) {
  .artist__header {
    height: auto;
    flex-flow: column wrap;
  }
  .artist__header .artist__info {
    margin-top: 0;
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    text-align: center;
  }
  .artist__header .artist__info .profile__img {
    margin-right: 0;
  }
  .artist__header .artist__info__type {
    margin-top: 10px;
  }
  .artist__header .artist__listeners {
    width: 100%;
    text-align: center;
  }
}

.album__info {
  margin-bottom: 15px;
  display: flex;
  flex-flow: row wrap;
}
.album__info__art img {
  width: 135px;
  height: 135px;
}
.album__info__meta {
  width: calc(100% - 150px);
  margin-left: 15px;
  display: flex;
  flex-flow: column wrap;
}
.album__info__meta .album__year {
  color: #aaaaaa;
  letter-spacing: 1px;
}
.album__info__meta .album__name {
  color: white;
  font-size: 30px;
  font-weight: 100;
}
.album__info__meta .album__actions {
  margin-top: auto;
}
.album__info__meta .album__actions .save {
  padding-left: 30px;
  padding-right: 30px;
  margin-right: 10px;
}
.album__info__meta .album__actions .save:hover {
  border-color: #1ed760;
}
.album__info__meta .album__actions .more {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  padding: 0;
  text-align: center;
}
.album .track__title {
  width: 70%;
}

@media (max-width: 1200px) {
  .album .tracks .track {
    height: auto;
    padding: 10px 0;
  }
}
.social {
  padding: 15px;
  text-align: center;
  overflow-y: scroll;
}
.social .friends {
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 15px;
}
.social .friends .friend {
  padding: 15px 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.social .friends .friend:first-child {
  padding-top: 0;
}
.social .friends .friend i {
  font-size: 20px;
  margin-right: 15px;
}

.media-cards {
  display: flex;
  flex-flow: row wrap;
}
.media-cards .media-card {
  margin: 15px;
  width: calc((100% / 4) - 30px);
}
.media-cards .media-card__image {
  height: 200px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
}
.media-cards .media-card__image i {
  color: white;
  font-size: 72px;
  margin: 0 auto;
  opacity: 0;
  transition: all 0.5s ease;
  text-shadow: 1px 5px 15px #181818;
}
.media-cards .media-card__image i:hover {
  cursor: pointer;
}
.media-cards .media-card__image:hover i {
  opacity: 1;
  transition: all 0.5s ease;
}
.media-cards .media-card__footer {
  display: block;
  background: #282828;
  padding: 15px;
  color: white;
}
.media-cards .media-card__footer:hover {
  cursor: pointer;
}

@media (max-width: 1100px) {
  .media-cards .media-card {
    width: calc((100% / 3) - 30px);
  }
}
@media (max-width: 768px) {
  .media-cards .media-card {
    width: calc((100% / 2) - 30px);
  }
}
@media (max-width: 480px) {
  .media-cards .media-card {
    margin: 15px 0;
    width: 100%;
  }
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #373737;
}

@media (max-width: 650px) {
  .header .window__actions {
    width: 15%;
  }
  .header .page-flows {
    width: 20%;
    margin: 0;
  }
  .header .search {
    width: 65%;
    margin: 0;
  }
  .header .search input {
    width: 100%;
    background-size: 7%;
  }
  .header .user {
    width: 100%;
    margin-top: 15px;
    justify-content: space-around;
  }
}
.h1 {
  font-size: 36px;
}

.h2,
.navigation__list__header {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}

.red {
  color: #fc615c;
}
.red:hover {
  color: #fb302a;
}

.yellow {
  color: #fdbe41;
}
.yellow:hover {
  color: #fcad0f;
}

.green {
  color: #34c94a;
}
.green:hover {
  color: #2aa03b;
}

button {
  border-radius: 20px;
  border: none;
  padding: 5px 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;
  outline: none;
}
button:hover {
  cursor: pointer;
}

.button-dark {
  background: #1ed760;
  color: white;
  border: 1px solid #1ed760;
}
.button-dark:hover {
  background: #43e57d;
}

.button-light {
  background: none;
  color: white;
  text-shadow: rgb(10, 8, 1) 1px 0 4px;
  border: 1px solid #c8c8c8;
}
.button-light:hover {
  border-color: white;
  color: white;
}

.section-title {
  text-transform: uppercase;
  color: #aaaaaa;
  letter-spacing: 1.25px;
  font-size: 13.2px;
  margin-bottom: 10px;
}
</style>
