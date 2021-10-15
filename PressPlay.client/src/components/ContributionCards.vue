<template>
  <div class="col-6 my-3 d-flex">
    <div>
      <router-link :to="{name: 'Project', params: {projectId: contribution.projectId}}" class="selectable text-light ">
        <img :src="contribution.project.albumArt" height="50" width="50" alt="">
      </router-link>
    </div>
    <div class="ps-3">
      Project:
      <h5>
        {{ contribution.project.name }}
      </h5>
    </div>
  </div>

  <div class="col-6 d-flex">
    <div>
      <b>{{ contribution.title }}</b>
    </div>
    <div class="">
      <audio :src="contribution.contributionMp3" controls style="width: 100px"></audio>
    </div>
  </div>

  <!-- <i class="mdi mdi-play f-20"></i> -->
</template>

<script>
import { Contribution } from '../models/Contribution'

export default {
  props: {
    contribution: {
      type: Contribution, default: () => new Contribution()
    }
  },
  setup() {
    return {
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
  display: inline-block;
}
.show-inline{
  display: flex;
  justify-content: space-between;
}
.front{
  display: flex;
  justify-content: space-between;
}
.back{
  display: flex;
  align-self: flex-start;
}
  .one-line{

  justify-content: flex-end;

}

</style>
