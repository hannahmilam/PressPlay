<template>
  <form>
    <div class="form-group">
      <label for="name">Project Name</label>
      <input type="text"
             class="form-control"
             v-model="editable.name"
             required
      >
    </div>
    <div class="form-group">
      <label for="description">Project Description</label>
      <textarea class="form-control"
                rows="3"
                v-model="editable.description"
                required
      ></textarea>
    </div>
    <div class="form-group">
      <label for="originalMp3">MP3 link</label>
      <input type="file"
             accept="audio/*"
             @change="setMp3File"
             class="form-control"
             required
      >
    </div>
    <div class="form-group">
      <label for="originalMp3">Password</label>
      <input type="text"
             class="form-control"
             v-model="editable.password"
      >
    </div>
    <div class="form-group">
      <label for="albumArt">Album Art</label>
      <input type="file"
             accept="image/*"
             @change="setAlbumArtFile"
             class="form-control"
      >
    </div>
    <div class="form-group">
      <label for="genreTags">Select Genre</label>
      <select class="form-control"
              v-model="editable.genreTags"
              required
      >
        <option>Rock</option>
        <option>Folk</option>
        <option>Hip-Hop</option>
        <option>Pop</option>
        <option>Clowncore</option>
        <option>Country</option>
      </select>
    </div>
    <div class="form-group">
      <label for="instrumentTag">Instruments on project</label>
      <input type="text" name="neededInstrumentTag" class="form-control" v-model="otherTemp">
      <button class="btn btn-info mt-2" type="button" @click="addInstrumentTag()">
        Add Tag
      </button>
    </div>
    <div>Tags:  <small v-for="e in editable.instrumentTags" :key="e">{{ e }} , </small> </div>
    <div class="form-group">
      <label for="neededInstrumentTag">Needed Instruments</label>
      <input type="text" name="neededInstrumentTag" class="form-control" v-model="temp">
      <button class="btn btn-info mt-2" type="button" @click="addNeededInstrumentTag()">
        Add Tag
      </button>
    </div>
    <div>Tags:  <small v-for="e in editable.neededInstrumentTags" :key="e">{{ e }}, </small> </div>
    <button @click="upload" class="btn btn-success mt-2" v-if="editable.neededInstrumentTags.length > 0 && editable.instrumentTags.length > 0" type="submit">
      Submit
    </button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'
import { Modal } from 'bootstrap'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { firebaseService } from '../services/FirebaseService'
export default {
  setup() {
    const temp = ref()
    const otherTemp = ref()
    const editable = ref({ neededInstrumentTags: [], instrumentTags: [] })
    const mp3File = ref([])
    const albumArtFile = ref([])
    return {
      temp,
      otherTemp,
      editable,
      mp3File,
      albumArtFile,
      addNeededInstrumentTag() {
        editable.value.neededInstrumentTags.push(temp.value)
        temp.value = []
      },
      addInstrumentTag() {
        editable.value.instrumentTags.push(otherTemp.value)
        otherTemp.value = []
      },
      async createProject() {
        try {
          const projectId = await projectsService.createProject(editable.value)
          mp3File.value = []
          albumArtFile.value = []
          // document.getElementById('image').src = ''
          // document.getElementById('audio').src = ''
          const modal = Modal.getInstance(document.getElementById('project-form'))
          modal.hide()
          router.push({
            name: 'Project',
            params: { projectId: projectId }
          })
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      setMp3File(e) {
        mp3File.value = e.target.files
        logger.log('Mp3 files ref value', mp3File.value)
      },
      setAlbumArtFile(e) {
        albumArtFile.value = e.target.files
        logger.log('AlbumArt files ref value', albumArtFile.value)
      },
      async upload() {
        const mp3Url = await firebaseService.upload(mp3File.value[0], 'Audio')
        editable.value.originalMp3 = mp3Url
        const albumArtUrl = await firebaseService.upload(albumArtFile.value[0], 'Image')
        editable.value.albumArt = albumArtUrl
        // editable.value.albumArt = url
        logger.log(albumArtUrl, mp3Url)
        await this.createProject()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
