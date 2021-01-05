const axios = require('axios')
const format = require('./server/format.js')
const schema = require('./server/schema.js')

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
      node.costMember = format.toCurrency(node.costMember)
      node.costNonMember = format.toCurrency(node.costNonMember)
      if (node.durationInMinutes) {
        node.duration = format.toDuration(node.durationInMinutes)
        delete node.durationInMinutes
      }
      if (node.dates) {
        node.dates = node.dates.map((date) => format.toDate(date))
      }
      node.image = require.resolve('./src/assets/events/' + node.image)
      // add event
      events.addNode(node)
      // create page
      api.createManagedPages(({ createPage }) => {
        if (event.type === 'Fitness') {
          createPage({
            path: '/fitness/' + event.id,
            component: './src/templates/fitness.vue',
            queryVariables: {
              id: event.id,
            },
          })
        } else if (event.type === 'Events') {
          createPage({
            path: '/events/' + event.id,
            component: './src/templates/event.vue',
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
        link: appointment.link,
      })
    }
  })

  api.loadSource(async (actions) => {
    const data = require('./src/data/news.json')
    const news = actions.addCollection('News')
    for (const item of data.slice(0, 4)) {
      news.addNode(item)
    }
  })

  api.loadSource(async (actions) => {
    const data = require('./src/data/join.json')
    const joins = actions.addCollection('Join')
    for (const item of data) {
      joins.addNode({
        title: item.title,
        text: item.text,
        link: item.link,
        image: require.resolve('./src/assets/home/' + item.image),
      })
    }
  })

  api.loadSource(async (actions) => {
    const data = require('./src/data/history.json')
    const history = actions.addCollection('History')
    data.forEach((item, index) => {
      const node = {
        sortIndex: index,
        date: item.date,
        text: item.text,
      }
      if (item.images && item.images.length > 0) {
        node.images = []
        for (const image of item.images) {
          node.images.push(require.resolve('./src/assets/history/' + image))
        }
      }
      history.addNode(node)
    })
  })

  api.loadSource(async (actions) => {
    const heroImages = actions.addCollection('heroImages')
    heroImages.addNode({
      id: 'home',
      src: require.resolve('./src/assets/home/main.jpg'),
    })
    heroImages.addNode({
      id: 'gaststaette',
      src: require.resolve('./src/assets/gaststaette/main.jpg'),
    })
    heroImages.addNode({
      id: 'sponsoring',
      src: require.resolve('./src/assets/sponsoring/main.jpg'),
    })
  })

  api.loadSource(async (actions) => {
    const gaststaette = actions.addCollection('gaststaette')
    gaststaette.addNode({
      id: '0',
      images: [
        require.resolve('./src/assets/gaststaette/1.jpg'),
        require.resolve('./src/assets/gaststaette/2.jpg'),
        require.resolve('./src/assets/gaststaette/3.jpg'),
      ],
    })
  })

  api.loadSource(({ addSchemaTypes }) => {
    schema.load(addSchemaTypes)
  })
}
