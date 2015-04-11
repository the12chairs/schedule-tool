
if (Meteor.isClient) {

    SimpleSchema.debug

    Template.navItems.helpers({
      activeIfTemplateIs: function (template) {
        var currentRoute = Router.current()
        return currentRoute &&
          template === currentRoute.lookupTemplate() ? 'active' : ''
      }
    })

    Template.listSubjects.helpers({
        subjects: subjects.find()
    })

    Template.listLecturers.helpers({
        lecturers: lecturers.find()
    })

    Template.listRooms.helpers({
        rooms: rooms.find()
    })

    Template.listChairs.helpers({
        chairs: chairs.find()
    })

    Template.listDepartaments.helpers({
        departaments: departaments.find()
    })

    Template.listSpecialities.helpers({
        specialities: specialities.find()
    })

    Template.listGroups.helpers({
        groups: groups.find()
    })

    Template.listSchedules.helpers({
        schedule: schedules.find()
    })


    Template.lecturersForm.helpers({
        subjectsLc: function() {
            var titles = []
            var subjectsList = subjects.find()
            subjectsList.forEach(function(e) {
                titles.push({label: e.title, value: e.title})
            })

            return titles
        },
        chairsLc: function() {
            var titles = []
            var chairsList = chairs.find()
            chairsList.forEach(function(e) {
                titles.push({label: e.title, value: e.title})
            })

            return titles//chairs.find().fetch()
        }
    })


    Template.groupsForm.helpers({
        codes: function() {
            var codes = []
            var specialitiesList = specialities.find()
            specialitiesList.forEach(function(e) {
                codes.push({label: e.code+':'+e.title,  value: e.code})
            })

            return codes
        }
    })

    Template.schedulesForm.helpers({
        subjectsSh: function() {
            var subj = []
            var subjList = subjects.find()
            subjList.forEach(function(e) {
                subj.push({label: e.title,  value: e._id})
            })
            return subj
        },
        roomsSh: function() {
            var roomsQ = []
            var roomsList = rooms.find()
            roomsList.forEach(function(e) {
                roomsQ.push({label: e.number+', '+e.building,  value: e._id})
            })
            return roomsQ
        },
        lecturersSh: function() {
            var leQ = []
            var lecList = lecturers.find()
            lecList.forEach(function(e) {
                leQ.push({label: e.fio,  value: e._id})
            })
            return leQ
        },
        groupsSh: function() {
            var grQ = []
            var grList = groups.find()
            grList.forEach(function(e) {
                grQ.push({label: e.name+', Курс: '+e.course+', Специальность: '+e.specialityCode,  value: e._id})
            })
            return grQ
        }
    })

/*
    Template.lecturersForm.events({
        'submit form': function(event){
            event.preventDefault()

            var fioQ = event.target.fio.value
            var chairQ = chairs.find({ _id: event.target.chair.value}).fetch()[0]
            var subjectsQ = subjects.find({ _id: event.target.subjects.value}).fetch()

            lecturers.insert({fio: fioQ, subjects: subjectsQ, chair: chairQ})

            return false
        }
    })
*/
    Template.schedulesForm.events({
        'submit form': function(event){
            event.preventDefault()

            var pairQ = event.target.pair.value
            var subjQ = subjects.find({ _id: event.target.subject.value}).fetch()[0]
            var roomQ = rooms.find({_id: event.target.room.value}).fetch()[0]
            var lecturerQ = lecturers.find({_id: event.target.lecturer.value}).fetch()[0]
            var groupQ = groups.find({ _id: event.target.group.value}).fetch()[0]

            schedules.insert({pair: pairQ, subject: subjQ, room: roomQ, lecturer: lecturerQ, group: groupQ})


            return false
        }
    })

    Template.signIn.events({

        'submit form' : function(event){
            e.preventDefault();
            // retrieve the input field values
            var email = event.target.username.value
            var password = event.target.password.value
            console.log('handle login form')


            Meteor.loginWithPassword(email, password, function(err){
                if (err){
                    console.log('errorr')
                } else {
                    console.log('success')
                }
                return false
            })

            return false
        }
    })

    AutoForm.hooks({
      groupForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            var s = specialities.find({ _id: insertDoc.speciality })

            this.done();
            return false;
        }
      }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    })
}



if (Meteor.isServer) {

  Meteor.startup(function () {
      /*
      Accounts.createUser({
          username: 'admin',
          email: 'admin@admin.com',
          password: 'admin',
          profile: {}
      })*/
  })

}
