<template>
  <div class="card m-1">
    <div>
      <router-link
        :to="{ name: 'Profile.Originals', params: { profileId: profile.id } }"
        class="selectable"
      >
        <img :src="profile.picture" class="small-picture" alt="" />
      </router-link>
    </div>
    <div class="card-body small-row">
      <p>{{ profile.name }}</p>
    </div>
  </div>
</template>

<script>
import { Profile } from '../models/Profile'
export default {
  props: {
    profile: {
      type: Profile, default: () => new Profile()
    }
  },
  setup() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.small-picture {
  width: 50px;
  height: 50px;
}
.small-row {
  height: 5rem;
  display: flex;
  justify-content: space-between;
}
</style>
