<template>
  <form @submit.prevent="createProject()">
    <div class="form-group">
      <label for="name">Project Name</label>
      <input type="text"
             class="form-control"
             id="exampleFormControlInput1"
             placeholder=""
             v-model="editable.name"
             required
      >
    </div>
    <div class="form-group">
      <label for="description">Project Description</label>
      <textarea class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="editable.description"
                required
      ></textarea>
    </div>
    <div class="form-group">
      <label for="genreTags">Select Genre</label>
      <select class="form-control"
              id="exampleFormControlSelect1"
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
      <label for="neededInstrumentTag">Needed Instruments</label>
      <input type="text" name="neededInstrumentTag" class="form-control" v-model="temp">
      <button class="btn btn-info mt-2" @click="addNeededInstrumentTag()">
        Add Tag
      </button>
    </div>
    <div>Tags:  <small v-for="e in editable.neededInstrumentTags" :key="e">{{ e }}, </small> </div>
    <button class="btn btn-success mt-2" v-if="editable.neededInstrumentTags.length > 0" type="submit">
      Submit
    </button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup() {
    const temp = ref()
    const editable = ref({ neededInstrumentTags: [] })
    return {
      temp,
      editable,
      addNeededInstrumentTag() {
        editable.value.neededInstrumentTags.push(temp.value)
        temp.value = []
      }

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
