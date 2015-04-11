
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

            return titles
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
        insertScheduleForm: {
            formToDoc: function(doc){
                doc.subject = subjects.find({_id: doc.subject.title}).fetch()[0]
                doc.room = rooms.find({_id: doc.room.building}).fetch()[0]
                doc.lecturer = lecturers.find({_id: doc.lecturer.fio}).fetch()[0]
                doc.group = groups.find({_id: doc.group.name}).fetch()[0]

                return doc
            }
        },
        updateScheduleForm: {
            formToDoc: function(doc){
                doc.subject = subjects.find({_id: doc.subject}).fetch()[0]
                doc.room = rooms.find({_id: doc.room}).fetch()[0]
                doc.lecturer = lecturers.find({_id: doc.lecturer}).fetch()[0]
                doc.group = groups.find({_id: doc.group}).fetch()[0]

                return doc

            }
        }
    })

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
