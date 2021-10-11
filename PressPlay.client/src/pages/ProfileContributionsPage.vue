<template>
  <div class="container-fluid">
    <div class="row mt-4">
      <div class="col-2 sidebar ps-4">
        <div class="row">
          <div class="text-center">
            <img :src="profile?.picture" height="100" class="rounded-circle" alt="">
          </div>
          <div>
            <h5>
              {{ profile?.name }}
            </h5>
          </div>

          <div>
            <p>Instruments</p>
            <p>{{ profile?.instrumentTags }}</p>
          </div>
          <div>
            <p>
              Genres
            </p>
            <p>
              {{ profile?.genreTags }}
            </p>
          </div>
          <div>
            <h5>
              About Me:
            </h5>
            <p>{{ profile?.bio }} </p>
          </div>
        </div>
      </div>
      <div class="col-10">
        <div class="row">
          <ContributionCards v-for="c in contributions" :key="c.id" :contribution="c" />
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
import { contributionsService } from '../services/ContributionsService'
export default {
  name: 'Profile',
  setup() {
    return {
      profile: computed(() => AppState.currentProfile),
      projects: computed(() => AppState.projects),
      contributions: computed(() => AppState.contributions)
    }
  }
}
</script>
<style scoped>

</style>
