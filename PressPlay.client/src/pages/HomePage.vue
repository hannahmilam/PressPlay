<template>
  <div class="container-fluid bg-dark text-white px-0">
    <div class="needs-guitar">
      <div class="row p-3">
        <h3 class="my-0 ms-3">
          Needs Guitar
        </h3>
      </div>

      <div class="row ms-5">
        <div class="col-1">
          <button class="btn btn-prev-next" @click="scroll('left', 'guitarScroll')" v-if="true">
            <i class="mdi mdi-chevron-left"></i>
          </button>
        </div>
        <div class="col-10">
          <div id="guitarScroll" class="row snappy-scroll">
            <HomeProjectsCards v-for="p in needsGuitarProjects" :key="p.id" :project="p" />
          </div>
        </div>
        <div class="col-1">
          <button class="btn btn-prev-next" @click="scroll('right', 'guitarScroll')" v-if="true">
            <i class="mdi mdi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="needs-vocals">
      <div class="row p-3">
        <h3 class="my-0 ms-3">
          Needs Vocals
        </h3>
      </div>
      <div class="row ms-5">
        <div class="col-1">
          <button class="btn btn-prev-next" @click="scroll('left', 'vocalsScroll')" v-if="true">
            <i class="mdi mdi-chevron-left"></i>
          </button>
        </div>
        <div class="col-10">
          <div id="vocalsScroll" class="row snappy-scroll">
            <HomeProjectsCards v-for="p in needsVocalsProjects" :key="p.id" :project="p" />
          </div>
        </div>
        <div class="col-1">
          <button class="btn btn-prev-next" @click="scroll('right', 'vocalsScroll')" v-if="true">
            <i class="mdi mdi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="needs-drums">
      <div class="row p-3">
        <h3 class="my-0 ms-3">
          Needs Drums
        </h3>
      </div>
      <div class="row ms-5">
        <div class="col-1">
          <button class="btn btn-prev-next" @click="scroll('left', 'drumsScroll')" v-if="true">
            <i class="mdi mdi-chevron-left"></i>
          </button>
        </div>
        <div class="col-10">
          <div id="drumsScroll" class="row snappy-scroll">
            <HomeProjectsCards v-for="p in needsDrumsProjects" :key="p.id" :project="p" />
          </div>
        </div>
        <div class="col-1">
          <button class="btn btn-prev-next" @click="scroll('right', 'drumsScroll')" v-if="true">
            <i class="mdi mdi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="needs-bass">
      <div class="row p-3">
        <h3 class="my-0 ms-3">
          Needs Bass
        </h3>
      </div>
      <div class="row ms-5">
        <div class="col-1">
          <button class="btn btn-prev-next" @click="scroll('left', 'bassScroll')" v-if="true">
            <i class="mdi mdi-chevron-left"></i>
          </button>
        </div>
        <div class="col-10">
          <div id="bassScroll" class="row snappy-scroll">
            <HomeProjectsCards v-for="p in needsBassProjects" :key="p.id" :project="p" />
          </div>
        </div>
        <div class="col-1">
          <button class="btn btn-prev-next" @click="scroll('right', 'bassScroll')" v-if="true">
            <i class="mdi mdi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="needs-piano">
      <div class="row p-3">
        <h3 class="my-0 ms-3">
          Needs Piano
        </h3>
      </div>

      <div class="row ms-5 pb-5">
        <div class="col-1">
          <button class="btn btn-prev-next" @click="scroll('left', 'pianoScroll')" v-if="true">
            <i class="mdi mdi-chevron-left"></i>
          </button>
        </div>
        <div class="col-10">
          <div id="pianoScroll" class="row snappy-scroll">
            <HomeProjectsCards v-for="p in needsPianoProjects" :key="p.id" :project="p" />
          </div>
        </div>
        <div class="col-1">
          <button class="btn btn-prev-next" @click="scroll('right', 'pianoScroll')" v-if="true">
            <i class="mdi mdi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'

export default {
  name: 'Home',
  setup() {
    const guitarOffset = ref(0)
    const vocalsOffset = ref(0)
    const drumsOffset = ref(0)
    const pianoOffset = ref(0)
    const bassOffset = ref(0)
    onMounted(async() => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      guitarOffset,
      vocalsOffset,
      drumsOffset,
      pianoOffset,
      bassOffset,
      needsGuitarProjects: computed(() => AppState.projects.filter(p => p.neededInstrumentTags.includes('guitar') === true)),
      needsVocalsProjects: computed(() => AppState.projects.filter(p => p.neededInstrumentTags.includes('vocals') === true)),
      needsDrumsProjects: computed(() => AppState.projects.filter(p => p.neededInstrumentTags.includes('drums') === true)),
      needsPianoProjects: computed(() => AppState.projects.filter(p => p.neededInstrumentTags.includes('piano') === true)),
      needsBassProjects: computed(() => AppState.projects.filter(p => p.neededInstrumentTags.includes('bass') === true)),
      scroll(dir, elementId) {
        const scrollAmmount = 400
        const element = document.getElementById(elementId)
        switch (dir) {
          case 'right':
            element.scrollTo({ left: element.scrollLeft + scrollAmmount, behavior: 'smooth' })
            break
          case 'left':
            element.scrollTo({ left: element.scrollLeft - scrollAmmount, behavior: 'smooth' })
            break
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
// .bg-img{
// background-image: url('https://images.unsplash.com/photo-1621367507503-1b5816c754a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80');
// background-size: cover;
// height: 200vh;
// }
.snappy-scroll{
  flex-wrap: nowrap !important;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar{ }
  &::-webkit-scrollbar-button{ /* 2 */ }
  &::-webkit-scrollbar-track{ /* 3 */ }
  &::-webkit-scrollbar-track-piece{  background-color: rgba(255, 255, 255, 0.541); border-radius: 45%; }
  &::-webkit-scrollbar-thumb{ background-color: rgba(255, 255, 255, 0.541); border-radius: 45%;}
  &::-webkit-scrollbar-corner{ /* 6 */ }
}
.snappy-scroll div{
  scroll-snap-align: start;
}
.container-fluid{
  height: 100%;
  font-family: 'Source Sans Pro', sans-serif;
}
.btn-prev-next{
  height: 100%;
  background-color: rgba(255, 255, 255, 0.63);
  color: black;
  scroll-behavior: smooth;
}

</style>
