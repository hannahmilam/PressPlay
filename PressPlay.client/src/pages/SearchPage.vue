<template>
  <div>
    <div>
      <form @submit.prevent="findProjectsByQuery()" class="bg-white rounded elevation-1">
        <div class="form-group d-flex align-items-center">
          <label for="search" class="sr-only"></label>
          <input v-model="query"
                 type="text"
                 name="search"
                 required
                 class="form-control bg-white border-0"
                 placeholder="search"
          >
          <button class="btn px-2 py-0 selectable">
            <i class="mdi mdi-magnify"></i>
          </button>
        </div>
      </form>
    </div>
    <div class="row">
      <div class="col-12">
        <button @click="toggleUsers()">
          Users
        </button>
        <button @click="toggleProjects()">
          Projects
        </button>
        <button @click="toggleHas()">
          Has
        </button>
        <button @click="toggleNeeds()">
          Needs
        </button>
      </div>
    </div>
    <div>
      <ProfileCards v-for="p in profile" :key="p.id" :profile="p" />
    </div>
    <div>
      <SearchProjectsCards v-for="p in projects" :key="p.id" :project="p" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService.js'
import { profilesService } from '../services/ProfilesService.js'

export default {

  setup() {
    const query = ref('')
    onMounted(async() => {
      AppState.profile = []
      AppState.projects = []
    })
    return {
      query,
      async findProjectsByQuery() {
        try {
          await projectsService.findProjectsByQuery(query.value)
          await profilesService.findProfileByQuery(query.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async toggleUsers() {
        AppState.projects = []
        await profilesService.sortProfileByQuery(query.value)
      },
      async toggleProjects() {
        AppState.profiles = []

        await projectsService.findProjectsByQuery(query.value)
      },

      async toggleHas() {
        AppState.profiles = []

        await projectsService.findProjectsByHas(query.value)
      },
      async toggleNeeds() {
        AppState.profiles = []

        await projectsService.findProjectsByNeeds(query.value)
      },
      projects: computed(() => AppState.projects),
      profile: computed(() => AppState.profile)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
