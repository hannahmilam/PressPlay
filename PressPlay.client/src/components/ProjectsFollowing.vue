<template>
  <div class="row">
    <div class="col-10 m-auto">
      <div class="card m-2 p-2 selectable" @click="goToProject">
        <div class="one-line">
          <div>
            <p class="p-0 m-0">
              <strong>
                {{ project?.name }}
              </strong>
            </p>
          </div>
        </div>
        <p class="p-0 m-0">
          {{ project?.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import { router } from '../router'
import Pop from '../utils/Pop'
export default {
  props: {
    project: {
      type: Object, required: true
    }
  },
  setup(props) {
    return {

      async goToProject() {
        try {
          const modal = Modal.getInstance(document.getElementById('projects-following-modal'))
          modal.hide()
          router.push({
            name: 'Project',
            params: { projectId: props.project.id }
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
