<template>
  <div class="selectable" @click="goToProfile">
    {{ projectsub?.name }}
    <img :src="projectsub?.picture" alt="">
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop'
import { router } from '../router'
export default {
  props: {
    projectsub: {
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
            params: { profileId: props.projectsub.id }
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
