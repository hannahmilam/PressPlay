<template>
  <form @submit.prevent="createContribution()">
    <div class="form-group">
      <label for="name">Contribution Name</label>
      <input type="text"
             class="form-control"
             id="exampleFormControlInput1"
             placeholder=""
             v-model="editable.title"
             required
      >
    </div>
    <div class="form-group">
      <label for="name">Contribution Mp3</label>
      <input type="text"
             class="form-control"
             id="exampleFormControlInput1"
             placeholder=""
             v-model="editable.contributionMp3"
             required
      >
    </div>
    <button class="btn btn-success mt-2" type="submit">
      Submit
    </button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { contributionsService } from '../services/ContributionsService'
import { useRoute } from 'vue-router'
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({ projectId: route.params.projectId })
    return {
      editable,
      async createContribution() {
        try {
          await contributionsService.createContribution(editable.value)
          const modal = Modal.getInstance(document.getElementById('contribution-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
