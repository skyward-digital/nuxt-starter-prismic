import Vue from 'vue'

export default async (_, inject) => {
  let sliceMachine = new Vue({
    methods: {
      resolver({ sliceName, i }) {
        return [ import(`/Users/louierichardson/Freelancing/nuxt-starter-prismic/slices/${sliceName}.vue`), import(`/Users/louierichardson/Freelancing/nuxt-starter-prismic/slices/${sliceName}/index.vue`), import(`/Users/louierichardson/Freelancing/nuxt-starter-prismic/slices/${sliceName}/index.js`), import(`/Users/louierichardson/Freelancing/nuxt-starter-prismic/slices/${sliceName}/${sliceName}.vue`) ]
      }
    }
  })
  inject('sliceMachine', sliceMachine);
}
