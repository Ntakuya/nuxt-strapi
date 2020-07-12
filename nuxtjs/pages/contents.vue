<template>
  <div>
    <div>sample</div>
    <div>{{ contents }}</div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const contents = await $axios.$get('http://strapi:1337/contents')
    return { contents }
  },
}
</script>

<style></style>
