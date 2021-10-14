<template>
  <div>
    <p>
      {{ comment.body }}
    </p>
  </div>
</template>

<script>

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
