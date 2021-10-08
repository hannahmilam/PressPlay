<template>
  <h1>{{ contribution.title }}</h1>
</template>

<script>

export default {
  props: {
    contribution: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
