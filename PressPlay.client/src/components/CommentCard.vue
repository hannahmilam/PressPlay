<template>
  <div class="p-2 row">
    <div class="col-1">
      <router-link
        :to="{
          name: 'Profile.Originals',
          params: { profileId: comment.creator.id },
        }"
      >
        <img
          class="selectable rounded-circle profile-img"
          :src="comment.creator.picture"
          alt=""
        />
      </router-link>
    </div>
    <div class="col-8">
      <p class="mt-2">
        {{ comment.body }}
      </p>
    </div>
    <div class="col-1">
      <div v-if="account.id === comment.creatorId">
        <button @click="removeComment" class="btn btn-dark">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { commentsService } from '../services/CommentsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {

      account: computed(() => AppState.account),
      async removeComment() {
        if (await Pop.confirm()) {
          try {
            await commentsService.removeComment(props.comment.id)
            Pop.toast('this has been removed')
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-img {
  height: 45px;
  width: 45px;
}
</style>
