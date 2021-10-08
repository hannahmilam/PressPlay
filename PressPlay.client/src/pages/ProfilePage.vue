<template>
  <h1>hello from profile page</h1>
</template>

<script>
import { watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    watchEffect(async() => {

    })
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
