import Vue from 'vue'
import Prismic from '@prismicio/client'
import PrismicDOM from 'prismic-dom'

import linkResolver from '../link-resolver.js'
import htmlSerializer from '../html-serializer.js'

export default async (context, inject) => {
  const { req, route, res, query, redirect, nuxtState, base } = context
  let options = {}

  // Pass through server requests, primarily for preview
  if (process.server) {
    options.req = req
  }

  let api = {}
  try {
    api = Prismic.client('https://nuxt-marketing-starter.prismic.io/api/v2', Object.assign({}, options,  {}))
  } catch (error) {
    console.error(error)
    console.error("Failed to init Prismic API, preventing app fatal error.")
  }

  let prismic = new Vue({
    computed: {
      api() {
        return api
      },
      apiEndpoint() {
        return 'https://nuxt-marketing-starter.prismic.io/api/v2'
      },
      predicates() {
        return Prismic.Predicates
      },
      dom() {
        return PrismicDOM
      }
    },
    methods: {
      asHtml(richText) {
        if (richText) {
          return PrismicDOM.RichText.asHtml(
            richText,
            linkResolver,
            htmlSerializer
          )
        }
      },
      asText(richText) {
        if (richText) {
          return PrismicDOM.RichText.asText(richText)
        }
      },
      asLink(link) {
        if (link) {
          return PrismicDOM.Link.url(
            link,
            linkResolver
          )
        }
      },
      asDate(date) {
        if (date) {
          return PrismicDOM.Date(date)
        }
      },

      async preview() {
        let url = '/'
        const { token, documentId } = query

        if (token) {
          const previewResolver = await this.api.getPreviewResolver(token, documentId)
          const maybeUrl = await previewResolver.resolve(this.linkResolver, '/')
          if (maybeUrl) {
            url = maybeUrl
          }
        }
        if (process.server) {
          redirect(302, url)
        } else {
          // Add the base path onto the url to preview
          url = `${base.replace(/\/$/, '')}${url}`

          window.location.replace(url)
        }
      },
      ...(linkResolver && { linkResolver }),
      ...(htmlSerializer && { htmlSerializer })
    }
  })

  inject('prismic', prismic)
  context.$prismic = prismic

  // Load prismic script after Nuxt app is mounted
  if (process.client) {
    window.onNuxtReady && window.onNuxtReady((app) => {
      const script = document.createElement('script')

      script.src = '//static.cdn.prismic.io/prismic.min.js?repo=nuxt-marketing-starter&new=true'
      document.body.appendChild(script)

        window.addEventListener('prismicPreviewUpdate', async (event) => {
          if (app && 'refresh' in app && typeof app.refresh === 'function') {
            event.preventDefault();
            if (app.$store && app.$store._actions.nuxtServerInit) {
              await app.$store.dispatch('nuxtServerInit', app.$options.context)
            }
            await app.refresh();
          }
        });
    })
  }
  // Preview mode
  if (process.server && !process.static && route.path === '/preview') {
    // Server side
    await prismic.preview()
  }
  if (process.client && process.static && route.path !== '/preview') {
    // Client side
    const getPreviewCookie = function () {
      var value = `; ${document.cookie}`
      var parts = value.split(`; ${Prismic.previewCookie}=`)
      if (parts.length !== 2) return null
      let cookie = parts.pop().split(';').shift()
      try {
        cookie = JSON.parse(decodeURIComponent(cookie))
      } catch (e) {
        cookie = null
      }
      return cookie
    }
    const repo = 'nuxt-marketing-starter'
    const previewCookie = getPreviewCookie()
    // Used in prismic_preview middleware
    prismic.isPreview = previewCookie && previewCookie[`${repo}.prismic.io`] && previewCookie[`${repo}.prismic.io`].preview

    // Refresh data from Prismic preview
    if (prismic.isPreview) {
      console.info('[@nuxtjs/prismic] Reload page data for preview')
      if (context.enablePreview) {
        context.enablePreview()
      } else {
        // Legacy static preview
        window.onNuxtReady(async (app) => {
          if (app.$store && app.$store._actions.nuxtServerInit) {
            await app.$store.dispatch('nuxtServerInit', app.$options.context)
          }
          await app.refresh()
        })
      }
    }
  }
}
