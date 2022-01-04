<template>
  <div>
    <Tutorial
      :title="document.data.title"
      :description="document.data.description"
    />
    <slice-zone type="homepage" query-type="single" />
  </div>
</template>

<script>
import SliceZone from 'vue-slicezone'

export default {
  name: 'IndexPage',
  components: {
    SliceZone,
  },
  async asyncData({ $prismic, error }) {
    const document = await $prismic.api.getSingle('homepage')

    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      document: {},
    }
  },
}
</script>
