subjects = new Meteor.Collection('subjects')
subjects.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Название",
        max: 200
    }
}))
