<template>
  <div>
    <Search />
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
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { profilesService } from '../services/ProfilesService'
export default {
  setup() {
    onMounted(async() => {
      try {
        await profilesService.getProfiles()
        await projectsService.getProjects()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      projects: computed(() => AppState.projects),
      profile: computed(() => AppState.profile)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
