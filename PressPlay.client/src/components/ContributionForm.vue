<template>
  <form>
    <div class="form-group">
      <label for="name">Contribution Name</label>
      <input type="text"
             class="form-control"

             v-model="editable.title"
             required
      >
    </div>
    <div class="form-group">
      <label for="name">Contribution Mp3</label>
      <input type="file"
             class="form-control"
             @change="setMp3File"
             accept="audio/*"
             required
      >
    </div>
    <button @click="upload" class="btn btn-success mt-2" type="submit">
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
import { logger } from '../utils/Logger'
import { firebaseService } from '../services/FirebaseService'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({ projectId: route.params.projectId })
    const mp3File = ref([])
    return {
      editable,
      mp3File,
      async createContribution() {
        try {
          await contributionsService.createContribution(editable.value)
          mp3File.value = []
          const modal = Modal.getInstance(document.getElementById('contribution-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error)
        }
      },
      setMp3File(e) {
        mp3File.value = e.target.files
        logger.log('Mp3 files ref value', mp3File.value[0])
      },
      async upload() {
        const mp3Url = await firebaseService.upload(mp3File.value[0], 'Audio')
        editable.value.contributionMp3 = mp3Url
        editable.value.fileName = mp3File.value[0].name
        logger.log(mp3Url)
        await this.createContribution()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
