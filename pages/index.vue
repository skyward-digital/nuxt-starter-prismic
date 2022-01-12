<template>
  <div>
    <Tutorial
      :title="document.data.title"
      :description="document.data.description"
    />
    <p class="text-center text-2xl my-5">Slices Example</p>
    <slice-zone type="homepage" query-type="single" />
    <ChangeCounter />
  </div>
</template>

<script>
import SliceZone from "vue-slicezone";
import ChangeCounter from "../components/ChangeCounter";

export default {
  name: "IndexPage",
  components: {
    SliceZone,
    ChangeCounter,
  },
  async asyncData({ $prismic, error }) {
    const document = await $prismic.api.getSingle("homepage");

    if (document) {
      return { document };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  data() {
    return {
      document: {},
    };
  },
};
</script>
