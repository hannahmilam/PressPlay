<template>
  <div class="col-3">
    <div class="card p-3">
      <div class="row justify-content-between">
        <div class="col-2">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB0Q7C35IjUnEFF1XDxd0hb6MHNNmRb3N3Ig&usqp=CAU" height="50" class="rounded-start" alt="">
        </div>
        <div class="col-4">
          <div class="row">
            <div class="col">
              <p class="p-0 m-0">
                <b>Artist Title</b>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="p-0 m-0">
                Artist Name
              </p>
            </div>
          </div>
        </div>
        <div class="col-3">
          <i class="mdi mdi-play f-20"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Project } from '../models/Project'

export default {
  props: {
    project: {
      type: Project, required: true
    }
  },
  setup() {
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  border: 1px solid rgba(0, 0, 0, 0.041);
  border-radius: 15px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
  overflow: hidden;
  position: relative;
  width: 370px;
}
</style>
