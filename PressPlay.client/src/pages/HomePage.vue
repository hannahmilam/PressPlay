<template>
  <div class="container-fluid bg-img px-0 text-light">
    <div class="mx-5 py-5 scrolling-wrapper">
      <p class="my-0 ms-3">
        Needs Guitar
      </p>
      <HomeProjectsCards v-for="p in needsGuitarProjects" :key="p.id" :project="p" />
    </div>
    <div class="mx-5 pb-5 scrolling-wrapper">
      <p class="my-0 ms-3">
        Needs Vocals
      </p>
      <HomeProjectsCards v-for="p in needsVocalsProjects" :key="p.id" :project="p" />
    </div>
    <div class="mx-5 pb-5 scrolling-wrapper">
      <p class="my-0 ms-3">
        Needs Drums
      </p>
      <HomeProjectsCards v-for="p in needsDrumsProjects" :key="p.id" :project="p" />
    </div>
    <div class="mx-5 pb-5 scrolling-wrapper">
      <p class="my-0 ms-3">
        Needs Bass
      </p>
      <HomeProjectsCards v-for="p in needsBassProjects" :key="p.id" :project="p" />
    </div>
    <div class="mx-5 scrollmenu scrolling-wrapper">
      <p class="my-0 ms-3">
        Needs Piano
      </p>
      <HomeProjectsCards v-for="p in needsPianoProjects" :key="p.id" :project="p" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'

export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    // REVIEW I put this on the end becasue neededInstrumentTags is an array within our object   VVVVVVVV
    return {
      needsGuitarProjects: computed(() => AppState.projects.filter(p => p.neededInstrumentTags.includes('guitar') === true)),
      needsVocalsProjects: computed(() => AppState.projects.filter(p => p.neededInstrumentTags.includes('vocals') === true)),
      needsDrumsProjects: computed(() => AppState.projects.filter(p => p.neededInstrumentTags.includes('drums') === true)),
      needsPianoProjects: computed(() => AppState.projects.filter(p => p.neededInstrumentTags.includes('piano') === true)),
      needsBassProjects: computed(() => AppState.projects.filter(p => p.neededInstrumentTags.includes('bass') === true))
    }
  }
}
</script>

<style scoped lang="scss">
.bg-img{
background-image: url('https://images.unsplash.com/photo-1621367507503-1b5816c754a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80');
background-size: cover;
height: 200vh;
}
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

}

</style>
