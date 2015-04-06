lecturers = new Meteor.Collection('lecturers')
lecturers.attachSchema(new SimpleSchema({
    fio: {
        type: String,
        label: "ФИО",
        max: 300
    },
    subjects: {
        type: [String],
        label: 'Предметы'
    },
    chair: {
        type: String,
        label: 'Кафедра',
        max: 300
    }

}))
