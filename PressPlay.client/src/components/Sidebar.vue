<template>
  <div class="row" v-if="account.id">
    <div>
      <router-link :to="{name: 'Profile', params: {profileId: account.id}}" class="btn selectable">
        <img :src="account.picture" height="150" class="rounded-circle" alt="">
      </router-link>
    </div>
    <div>
      <h5>
        {{ account.name }}
      </h5>
    </div>

    <div>
      <p>Instruments</p>
      <p>{{ account.instrumentTags }}</p>
    </div>
    <div>
      <p>
        Genres
      </p>
      <p>
        {{ account.genreTags }}
      </p>
    </div>
    <div>
      <h5>
        About Me:
      </h5>
      <p>{{ account.bio }} </p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
