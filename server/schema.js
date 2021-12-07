function load(addSchemaTypes) {
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
        image: Image
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
        bookingButton: String
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
        link: String
      }
    `)
}

module.exports = {
  load: load,
}
