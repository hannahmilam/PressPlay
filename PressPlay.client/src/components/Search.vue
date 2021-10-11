<template>
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
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'
import { profilesService } from '../services/ProfilesService.js'
export default {
  setup() {
    const query = ref('')
    return {
      query,
      async findProjectsByQuery() {
        try {
          await projectsService.findProjectsByQuery(query.value)
          await profilesService.findProfileByQuery(query.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style>

</style>
