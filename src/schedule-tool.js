
if (Meteor.isClient) {

    Meteor.subscribe("schedules");
    Meteor.subscribe("rooms");
    Meteor.subscribe("lecturers");
    Meteor.subscribe("subjects");
    Meteor.subscribe("departaments");
    Meteor.subscribe("groups");
    Meteor.subscribe("chairs");
    Meteor.subscribe("specialities");

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
        schedule: function () {
            var group = Session.get('group');
            var lecturer = Session.get('lecturer');

            if(typeof(group) == "undefined") {
                group = ''
            }

            if(typeof(lecturer) == "undefined"){
                lecturer = ''
            }

            if(group != '' && lecturer != '') {
                var s = schedules.find({'group.name': group, 'lecturer.fio': lecturer})
            } else if(group != '' && lecturer == '') {
                var s = schedules.find({'group.name': group})
            } else if(lecturer != '' && group == '') {
                var s = schedules.find({'lecturer.fio': lecturer})
            } else {
                var s = schedules.find()
            }

            return s
        }
    })

    Template.filter.helpers({
        prevLecturer: function () {
            var lecturer = Session.get('lecturer');

            if(typeof(lecturer) == "undefined") {
                lecturer = '';
            }

            return lecturer;
        },
        prevGroup: function () {
            var group = Session.get('group');

            if(typeof(group) == "undefined") {
                group = '';
            }

            return group;
        }
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

        'submit #login-form' : function(event, template){
            // 1. Collect the username and password from the form
            var username = template.find('#login-username').value
            var password = template.find('#login-password').value
            // 2. Attempt to login.
            Meteor.loginWithPassword(username, password, function(error) {
                // 3. Handle the response
                if (Meteor.user()) {
                    // Redirect the user to where they're loggin into. Here, Router.go uses
                    // the iron:router package.
                    Router.go('schedule')
                } else {
                    var message = "Невозможно войти в систему: <strong>" + error.reason + "</strong>";
                    template.find('#form-messages').html(message);
                }
                return
            });

            return false
        }
    })

    Template.userBadge.events({
        'click .logout': function(event) {
            event.preventDefault()
            Meteor.logout()
            Router.go('home')
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

    Template.listSchedules.events({
        'click #doFilter': function(event, template) {
            event.preventDefault();
            var group = template.find('#groupFilter').value;
            var lecturer = template.find('#lecturerFilter').value;

            Session.set('group', group);
            Session.set('lecturer', lecturer);

            return false;
        },
        'click #resetFilter': function(event, template) {
            event.preventDefault();
            Session.set('group', '');
            Session.set('lecturer', '');

            return false;
        },
        'mouseover #updateScheduleForm': function(event, template) {

            var subject = this.doc.subject.title;
            var room = this.doc.room.number +', '+ this.doc.room.building;
            var lecturer = this.doc.lecturer.fio;
            var group = this.doc.group.name;


            if($('select[name="subject"]').val()=='') {
                $('select[name="subject"] option:contains("'+subject+'")').prop('selected', true);
            }
            if($('select[name="room"]').val()=='') {
                $('select[name="room"] option:contains("'+room+'")').prop('selected', true);
            }
            if($('select[name="lecturer"]').val()=='') {
                $('select[name="lecturer"] option:contains("'+lecturer+'")').prop('selected', true);
            }
            if($('select[name="group"]').val()=='') {
                $('select[name="group"] option:contains("'+group+'")').prop('selected', true);
            }
        },
        'hidden.bs.modal': function(event, template) {
            $('select[name="subject"]').val('')
            $('select[name="room"]').val('')
            $('select[name="lecturer"]').val('')
            $('select[name="group"]').val('')
        }
    });


    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    })
}

if (Meteor.isServer) {

    Meteor.publish("schedules", function () {
        return schedules.find();
    });
    Meteor.publish("rooms", function () {
      return rooms.find();
    });
    Meteor.publish("lecturers", function () {
      return lecturers.find();
    });
    Meteor.publish("chairs", function () {
      return chairs.find();
    });
    Meteor.publish("departaments", function () {
      return departaments.find();
    });
    Meteor.publish("subjects", function () {
      return subjects.find();
    });
    Meteor.publish("specialities", function () {
      return specialities.find();
    });
    Meteor.publish("groups", function () {
      return groups.find();
    });

    if (Meteor.users.find().count() === 0 ) {
        var usr = Accounts.createUser({
            username: 'redactor',
            password: 'redactor'
        })

        var usr2 = Accounts.createUser({
            username: 'viewer',
            password: 'viewer'
        })
        Roles.addUsersToRoles(usr, ['redactor'])
        Roles.addUsersToRoles(usr2, ['viewer'])
    }

    Meteor.startup(function () {
    })

}
