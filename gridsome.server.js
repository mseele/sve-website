const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const axios = require('axios')

const backendURL = process.env.BACKEND_URL
const eventsAPI = backendURL + 'api/events'
const newsAPI = backendURL + 'api/news'
const contactAPI = backendURL + 'api/contact'

module.exports = function (api) {
  api.loadSource((store) => {
    store.addMetadata('eventsAPI', eventsAPI)
    store.addMetadata('newsAPI', newsAPI)
    store.addMetadata('contactAPI', contactAPI)
  })

  api.loadSource(async (actions) => {
    const { data } = await axios.get(eventsAPI + '?beta=' + process.env.BETA)
    const events = actions.addCollection('Event')
    for (const event of data) {
      events.addNode(event)
      api.createManagedPages(({ createPage }) => {
        if (event.type === 'Fitness') {
          createPage({
            path: '/fitness/' + event.id,
            component: './src/templates/Fitness.vue',
            queryVariables: {
              id: event.id,
            },
          })
        } else if (event.type === 'Events') {
          createPage({
            path: '/event/' + event.id,
            component: './src/templates/Events.vue',
            queryVariables: {
              id: event.id,
            },
          })
        }
      })
    }
  })

  api.loadSource(({ addSchemaTypes }) => {
    addSchemaTypes(`
      type Event implements Node {
        id: ID!
        sheetId: String
        gid: Int
        type: String
        name: String
        sortIndex: Int
        visible: Boolean
        beta: Boolean
        shortDescription: String
        description: String
        image: String
        light: Boolean
        dates(
          format: String
          locale: String
        ): [Date]
        customDate: String
        durationInMinutes: Int
        maxSubscribers: Int
        subscribers: Int
        costMember: Int
        costNonMember: Int
        waitingList: Int
        maxWaitingList: Int
        location: String
        bookingTemplate: String
        waitingTemplate: String
        externalOperator: Boolean
      }
    `)
  })

  api.chainWebpack((config, { isServer }) => {
    config.plugin('vuetify-loader').use(
      new VuetifyLoaderPlugin({
        progressiveImages: true,
      })
    )
  })
}
