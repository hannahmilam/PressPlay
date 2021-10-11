<template>
  <div class="col-md-4 my-3">
    <router-link :to="{name: 'Project', params: {projectId: contribution.projectId}}" class="selectable text-light">
      <div class="card mx-3 p-3">
        <div class="row justify-content-between">
          <div class="col-2">
            <!-- <router-link :to="{name: 'Profile.Originals', params: {profileId: project.creatorId}}" class="selectable"> -->
            <img :src="contribution.collaborator?.picture" height="50" class="rounded img-f" alt="">
            <!-- </router-link> -->
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col">
                <p class="p-0 m-0">
                  <b>{{ contribution.title }}</b>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p class="p-0 m-0">
                  {{ contribution.collaborator?.name }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <!-- <i class="mdi mdi-play f-20"></i> -->
            <audio :src="contribution.contributionMp3" controls style="width: 100px"></audio>
          </div>
        </div>
      </div>
    </router-link>
  </div>
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

</style>
