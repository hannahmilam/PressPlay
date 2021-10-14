<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <button class="btn btn-project" data-bs-toggle="modal" data-bs-target="#contribution-form">
            <b class="text-light">New Contribution</b>
          </button>
        </div>
        <div class="card-body">
          <div v-if="contributions.length > 0">
            <ContributionsCards v-for="c in contributions" :key="c.id" :contribution="c" />
          </div>
          <div v-else>
            <p>
              Be The first contribution
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      contributions: computed(() => AppState.contributions)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
