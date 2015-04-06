chairs = new Meteor.Collection('chairs')
chairs.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Название",
        max: 300
    }
}))
