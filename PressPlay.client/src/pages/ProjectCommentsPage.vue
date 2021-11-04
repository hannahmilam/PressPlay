<template>
  <div class="row">
    <div class="col-8 m-auto">
      <div class="card">
        <div class="card-body scroll-box" v-if="comments.length > 0">
          <CommentCard v-for="c in comments" :key="c.id" :comment="c" />
        </div>
        <div v-else class="ms-2 mt-2">
          <p>Be the first comment</p>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-8 m-auto">
      <div class="card-footer">
        <form @submit.prevent="postComment()">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="coment-card"
              placeholder="Add Comment"
              v-model="editable.body"
              required
            />
          </div>
          <button class="btn btn-success mt-2" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { commentsService } from '../services/CommentsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({ projectId: route.params.projectId })
    return {
      editable,
      comments: computed(() => AppState.comments),
      async postComment() {
        try {
          await commentsService.postComment(editable.value)
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-box {
  overflow-y: scroll;
  min-height: 100px;
  max-height: 300px;
}
</style>
