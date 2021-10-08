<template>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { contributionsService } from '../services/ContributionsService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await contributionsService.getcontributionsByProjectId(route.params.projectId)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      contributions: computed(() => AppState.contributions)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
