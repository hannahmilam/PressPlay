<template>
  <div class="selectable" @click="goToProfile">
    {{ projectSub?.profile?.name }}
    <img :src="projectSub?.profile?.picture" alt="" />
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop'
import { router } from '../router'
export default {
  props: {
    projectSub: {
      type: Object, required: true
    }
  },
  setup(props) {
    return {
      async goToProfile() {
        try {
          const modal = Modal.getInstance(document.getElementById('followers-form'))
          modal.hide()
          router.push({
            name: 'Profile.Originals',
            params: { profileId: props.projectSub.profileId }
          })
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
