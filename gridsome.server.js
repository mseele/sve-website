const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const axios = require('axios')
const format = require('./server/format.js')

const backendURL = process.env.BACKEND_URL
const eventsAPI = backendURL + 'api/events'
const newsAPI = backendURL + 'api/news'
const contactAPI = backendURL + 'api/contact'
const calendarAPI = backendURL + 'api/calendar'

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
      // convert values
      const node = JSON.parse(JSON.stringify(event))
      if (node.costMember) {
        node.costMember = format.toCurrency(node.costMember)
      }
      if (node.costNonMember) {
        node.costNonMember = format.toCurrency(node.costMember)
      }
      if (node.durationInMinutes) {
        node.duration = format.toDuration(node.durationInMinutes)
        delete node.durationInMinutes
      }
      if (node.dates) {
        node.dates = node.dates.map((date) => format.toDate(date))
      }
      // add event
      events.addNode(node)
      // create page
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
            path: '/events/' + event.id,
            component: './src/templates/Event.vue',
            queryVariables: {
              id: event.id,
            },
          })
        }
      })
    }
  })

  api.loadSource(async (actions) => {
    const { data } = await axios.get(calendarAPI + '/appointments')
    const appointments = actions.addCollection('Appointment')
    for (const appointment of data) {
      appointments.addNode({
        sortIndex: appointment.sortIndex,
        date: format.toDatespan(appointment),
        time: format.toTimespan(appointment),
        title: appointment.title,
        description: appointment.description,
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
        dates: [String]
        customDate: String
        duration: String
        maxSubscribers: Int
        subscribers: Int
        costMember: String
        costNonMember: String
        waitingList: Int
        maxWaitingList: Int
        location: String
        bookingTemplate: String
        waitingTemplate: String
        externalOperator: Boolean
      }
    `)

    addSchemaTypes(`
      type Appointment implements Node {
        id: ID!
        sortIndex: Int
        date: String
        time: String
        title: String
        description: String
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
