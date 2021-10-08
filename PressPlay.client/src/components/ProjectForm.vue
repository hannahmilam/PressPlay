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
      <label for="name">Project Name</label>
      <input type="text"
             class="form-control"
             id="exampleFormControlInput1"
             placeholder=""
             v-model="editable.neededInstrumentTags"
             required
      >
      <!-- run add neededInstrumentTags method with this button -->
      {{ editable.neededInstrumentTags }}
      <button>Add Tag</button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup() {
    const editable = ref({ neededInstrumentTags: [] })
    return { editable }
  }
}
</script>

<style lang="scss" scoped>

</style>
