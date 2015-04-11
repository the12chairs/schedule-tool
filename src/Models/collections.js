var Schemas = {}
Schemas.Chair = new SimpleSchema({
    title: {
        type: String,
        label: "Название",
        max: 300
    }
})
Schemas.Departament = new SimpleSchema({
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
})
Schemas.Speciality = new SimpleSchema({
    code: {
        type: Number,
        label: "Код",
    },
    title: {
        type: String,
        label: "Название",
        max: 500
    }
})
Schemas.Group = new SimpleSchema({
    name: {
        type: String,
        label: "Название",
        max: 300
    },
    course: {
        type: Number,
        label: "Курс",
        min: 1,
        max: 5
    },
    specialityCode: {
        type: Number,
        label: "Специальность"
    },
})
Schemas.Lecturer = new SimpleSchema({
    fio: {
        type: String,
        label: "ФИО",
        max: 300
    },
    subjects: {
        type: [Schemas.Subject],
        label: 'Предметы'
    },
    chair: {
        type: Schemas.Chair,
        label: 'Кафедра'
    }

})
Schemas.Room = new SimpleSchema({
    number: {
        type: Number,
        label: "Номер"
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
})

Schemas.Subject = new SimpleSchema({
    title: {
        type: String,
        label: "Название",
        max: 200
    }
})

Schemas.Schedule = new SimpleSchema({
    pair: {
        type: Number,
        label: "Номер пары",
        min:1,
        max:6
    },
    subject: {
        type: Schemas.Subject,
        label: "Предмет"
    },
    room: {
        type: Schemas.Room,
        label: "Аудитория"
    },
    lecturer: {
        type: Schemas.Lecturer,
        label: "Преподаватель"
    },
    group: {
        type: Schemas.Group,
        label: "Группа"
    }
})

chairs = new Mongo.Collection('chairs')
chairs.attachSchema(Schemas.Chair)

groups = new Mongo.Collection('groups')
groups.attachSchema(Schemas.Group)

departaments = new Mongo.Collection('departaments')
departaments.attachSchema(Schemas.Departament)

lecturers = new Mongo.Collection('lecturers')
lecturers.attachSchema(Schemas.Lecturer)

rooms = new Mongo.Collection('rooms')
rooms.attachSchema(Schemas.Room)

specialities = new Mongo.Collection('specialities')
specialities.attachSchema(Schemas.Speciality)

subjects = new Mongo.Collection('subjects')
subjects.attachSchema(Schemas.Subject)

schedules = new Mongo.Collection('schedules')
schedules.attachSchema(Schemas.Schedule)
