<template>
  <!-- <router-link :to="{name: 'Profile.Originals', params: {profileId: subscriber.subscriber?.id}}" class="selectable"> -->
  <div class="selectable col-3" @click="goToProfile()">
    <img
      :src="subscribing?.picture"
      height="45"
      width="45"
      class="rounded-circle"
      alt=""
    >
    <p class="overflow-hidden">
      {{ subscribing?.name }}
    </p>
  <!-- </router-link> -->
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop'
import { router } from '../router'
export default {
  props: {
    subscribing: {
      type: Object, required: true
    }
  },
  setup(props) {
    return {
      async goToProfile() {
        try {
          const modal = Modal.getInstance(document.getElementById('subscribing-modal'))
          modal.hide()
          router.push({
            name: 'Profile.Originals',
            params: { profileId: props.subscribing.id }
          })
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
