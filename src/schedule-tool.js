
if (Meteor.isClient) {

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

    Template.lecturersForm.helpers({
        subjects: function() {
            var titles = []
            var subjectsList =  subjects.find()
            subjectsList.forEach(function(e) {
                titles.push({label: e.title, value: e.title})
            })

            return titles
        },

        chairs: function() {
            var titles = []
            var chairsList =  chairs.find()
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
