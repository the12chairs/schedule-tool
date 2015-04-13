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
        label: "Специальность",
        autoform: {
            options: function() {
                var codes = []
                var specialitiesList = specialities.find()
                specialitiesList.forEach(function(e) {
                    codes.push({label: e.code+':'+e.title,  value: e.code})
                })

                return codes
            }
        }
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
        label: 'Предметы',
        autoform: {
            options: function() {
                var titles = []
                var subjectsList = subjects.find()
                subjectsList.forEach(function(e) {
                    titles.push({label: e.title, value: e.title})
                })
                return titles
            }
        }
    },
    chair: {
        type: Schemas.Chair,
        label: 'Кафедра',
        autoform: {
            options: function() {
                var titles = []
                var chairsList = chairs.find()
                chairsList.forEach(function(e) {
                    titles.push({label: e.title, value: e.title})
                })

                return titles
            }
        }
    },
    'chair.title': {
        type: String,
        label: 'Кафедра',
        autoform: {
            options: function() {
                var titles = []
                var chairsList = chairs.find()
                chairsList.forEach(function(e) {
                    titles.push({label: e.title, value: e.title})
                })

                return titles
            }
        }
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
                {'label': 'Физ', value: 'Физкультура'}
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
    weeknumber: {
        type: String,
        label: "Номер недели",
        autoform: {
            options: [
                {'label': 'Первая', value: 'Первая'},
                {'label': 'Вторая', value: 'Вторая'}
            ]
        }
    },
    weekday: {
        type: String,
        label: "День недели",
        autoform: {
            options: [
                {'label': 'Понедельник', value: 'Понедельник'},
                {'label': 'Вторник', value: 'Вторник'},
                {'label': 'Среда', value: 'Среда'},
                {'label': 'Четверг', value: 'Четверг'},
                {'label': 'Пятница', value: 'Пятница'},
                {'label': 'Суббота', value: 'Суббота'}
            ]
        }
    },
    pair: {
        type: Number,
        label: "Номер пары",
        min:1,
        max:6
    },
    subject: {
        type: Schemas.Subject,
        label: "Предмет",
        autoform: {
            options: function() {
                var subj = []
                var subjList = subjects.find()
                subjList.forEach(function(e) {
                    subj.push({label: e.title,  value: e._id})
                })
                return subj
            }
        }
    },
    'subject.title': {
        type: String,
        label: "Предмет",
        autoform: {
            options: function() {
                var subj = []
                var subjList = subjects.find()
                subjList.forEach(function(e) {
                    subj.push({label: e.title,  value: e._id})
                })
                return subj
            }
        }
    },
    room: {
        type: Schemas.Room,
        label: "Аудитория",
        autoform: {
            options: function() {
                var roomsQ = []
                var roomsList = rooms.find()
                roomsList.forEach(function(e) {
                    roomsQ.push({label: e.number+', '+e.building,  value: e._id})
                })
                return roomsQ
            }
        }
    },
    'room.building': {
        type: String,
        label: "Аудитория",
        autoform: {
            options: function() {
                var roomsQ = []
                var roomsList = rooms.find()
                roomsList.forEach(function(e) {
                    roomsQ.push({label: e.number+', '+e.building,  value: e._id})
                })
                return roomsQ
            }
        }
    },
    lecturer: {
        type: Schemas.Lecturer,
        label: "Преподаватель",
        autoform: {
            options: function () {
                var leQ = []
                var lecList = lecturers.find()
                lecList.forEach(function(e) {
                    leQ.push({label: e.fio,  value: e._id})
                })
                return leQ
            }
        }
    },
    'lecturer.fio': {
        type: String,
        label: "Преподаватель",
        autoform: {
            options: function() {
                var leQ = []
                var lecList = lecturers.find()
                lecList.forEach(function(e) {
                    leQ.push({label: e.fio,  value: e._id})
                })
                return leQ
            }
        }
    },
    group: {
        type: Schemas.Group,
        label: "Группа",
        autoform: {
            options: function() {
                var grQ = []
                var grList = groups.find()
                grList.forEach(function(e) {
                    grQ.push({label: e.name+', Курс: '+e.course+', Специальность: '+e.specialityCode,  value: e._id})
                })
                return grQ
            }
        }
    },
    'group.name': {
        type: String,
        label: "Группа",
        autoform: {
            options: function() {
                var grQ = []
                var grList = groups.find()
                grList.forEach(function(e) {
                    grQ.push({label: e.name+', Курс: '+e.course+', Специальность: '+e.specialityCode,  value: e._id})
                })
                return grQ
            }
        }
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
