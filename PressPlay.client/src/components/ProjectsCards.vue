<template>
  <div class="col-md-4 my-3">
    <div class="card mx-3 p-3">
      <div class="row justify-content-between">
        <div class="col-2">
          <router-link :to="{name: 'Profile.Originals', params: {profileId: project.creatorId}}" class="selectable">
            <img :src="project.creator.picture" height="50" class="rounded img-f" alt="">
          </router-link>
        </div>
        <div>
          <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable text-light">
            <img class="small" :src="project.albumArt" alt="">
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
        <div class="selectable" @click.stop="setSource()">
          <!-- <i class="mdi mdi-play f-20"></i> -->
          <audio :id="project.id" controls style="width: 100px"></audio>
        </div>
      </div>
      <small>
        <p>Contributions: {{ contributions.length }}</p>
      </small>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Project } from '../models/Project'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'

export default {
  props: {
    project: {
      type: Project, default: () => new Project()
    }
  },
  setup(props) {
    return {
      contributions: computed(() => AppState.contributions.filter(c => c.projectId === props.project.id)),
      async setSource() {
        try {
          const foundAudioTag = document.getElementById(props.project.id)
          foundAudioTag.src = props.project.spotlightMp3
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
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
.small {
  height: 100px;
  width: 100px;
}

</style>
