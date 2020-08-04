const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const axios = require('axios')

const backendURL = process.env.BACKEND_URL
const eventsAPI = backendURL + 'api/events'
const newsAPI = backendURL + 'api/news'
const contactAPI = backendURL + 'api/contact'
const calendarAPI = backendURL + 'api/calendar'

function toDate(appointment) {
  const formatter = new Intl.DateTimeFormat('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  if (appointment.startDate && appointment.endDate) {
    if (appointment.startDate === appointment.endDate) {
      return formatter.format(
        new Date(appointment.startDate + 'T00:00:00.000Z')
      )
    }
    return (
      formatter.format(new Date(appointment.startDate + 'T00:00:00.000Z')) +
      ' - ' +
      formatter.format(new Date(appointment.endDate + 'T00:00:00.000Z'))
    )
  }
  const start = formatter.format(
    new Date(appointment.startDateTime + ':00.000Z')
  )
  const endDate = new Date(appointment.endDateTime + ':00.000Z')
  const end = formatter.format(endDate)
  if (start === end) {
    return start
  }
  if (start === formatter.format(new Date(endDate.valueOf() - 60000))) {
    return start
  }
  return start + ' - ' + end
}

function toTime(appointment) {
  if (appointment.startDate && appointment.endDate) {
    return 'ganztägig'
  }
  const formatter = new Intl.DateTimeFormat('de-DE', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  })
  const start = formatter.format(
    new Date(appointment.startDateTime + ':00.000Z')
  )
  const end = formatter.format(new Date(appointment.endDateTime + ':00.000Z'))
  return start + ' - ' + end + ' Uhr'
}

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
        date: toDate(appointment),
        time: toTime(appointment),
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
