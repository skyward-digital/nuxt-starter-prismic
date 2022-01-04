<template>
  <section class="mx-auto bg-gray-100 w-max py-10 px-16 rounded-md">
    <prismic-rich-text :field="slice.primary.description" />
  </section>
</template>

<script>
export default {
  name: 'TextSlice',
  props: {
    slice: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
  },
}
</script>
