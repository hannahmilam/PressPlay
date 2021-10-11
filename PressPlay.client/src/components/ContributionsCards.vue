<template>
  <h1>{{ contribution.title }}</h1>
  <button @click="removeContribution">
    Delete Contribution
  </button>
</template>

<script>
import { useRoute } from 'vue-router'
import { contributionsService } from '../services/ContributionsService'
import Pop from '../utils/Pop'

export default {
  props: {
    contribution: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async removeContribution() {
        if (await Pop.confirm()) {
          try {
            await contributionsService.removeContribution(props.contribution.id)
            Pop.toast('this has been removed')
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
