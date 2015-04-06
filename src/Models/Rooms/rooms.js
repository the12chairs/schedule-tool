rooms = new Meteor.Collection('rooms')
rooms.attachSchema(new SimpleSchema({
    number: {
        type: Number,
        label: "Номер",
    },
    building: {
        type: String,
        label: "Корпус",
        autoform: {
            options: [
                {'label': 'Главный', value: 'Главный'},
                {'label': 'K2', value: 'K2'},
                {'label': 'К3', value: 'К3'},
                {'label': 'Физ', value: 'Физкультура'},
            ]
        }
    }
}))
