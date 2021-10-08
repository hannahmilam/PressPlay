<template>
  <div class="container-fluid px-0">
    <div class="row img-row">
    </div>

    <div class="row mx-5">
      <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.img-row{
height: 30rem;
background-image: url('https://images.unsplash.com/photo-1519479029449-38c9aed0f322?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBtdXNpY3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
background-repeat: no-repeat;

}

</style>
