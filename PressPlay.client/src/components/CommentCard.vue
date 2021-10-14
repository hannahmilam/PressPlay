<template>
  <div class="p-2 jc-around">
    <div class="in-line">
      <img class="small p-1" :src="comment.creator.picture" alt="">
      <p>
        {{ comment.body }}
      </p>
    </div>
    <div>
      <div v-if="account.id === comment.creatorId">
        <button @click="removeComment" class="btn btn-dark">
          Delete
        </button>
      </div>
      <div v-else>
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
.small {
  border-radius: 50%;
  width: 30px
}
.in-line {
display: flex;
}
.jc-around {
  display: flex;
  justify-content: space-between;
}

</style>
