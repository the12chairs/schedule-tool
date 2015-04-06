departaments = new Meteor.Collection('departaments')
departaments.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Название",
        max: 300
    },
    phone: {
        type: String,
        optional: true,
        label: "Телефон деканата",
        max: 300
    }
}))
