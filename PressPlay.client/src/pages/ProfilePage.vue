<template>
  <h1>hello from profile page</h1>
</template>

<script>
import { watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import Pop from '../utils/Pop'
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.profileId) {
        AppState.currentProfile = null
        try {
          await profilesService.getProfileById(route.params.profileId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
