<template>
  <div class="container-fluid bg-img px-0 text-light">
    <div class="row">
      <div class="col-6 offset-5">
        <div class="card">
        </div>
      </div>
    </div>

    <div class="row mx-5 scrollmenu">
      <p>Needs Guitar</p>
      <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
    </div>
    <div class="row mx-5 scrollmenu">
      <p>Needs Vocals</p>
      <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
    </div>
    <div class="row mx-5 scrollmenu">
      <p>Needs Drums</p>
      <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
    </div>
    <div class="row mx-5 scrollmenu">
      <p>Needs Bass</p>
      <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
    </div>
    <div class="row mx-5 scrollmenu">
      <p>Needs Piano</p>
      <ProjectsCards v-for="p in projects" :key="p.id" :project="p" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'

export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.bg-img{
background-image: url('https://images.unsplash.com/photo-1621367507503-1b5816c754a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80');
background-size: cover;
background-repeat: no-repeat;
height: 100vh;
}

</style>
