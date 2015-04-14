
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
                if(doc.subject != null) {
                    doc.subject = subjects.find({_id: doc.subject.title}).fetch()[0]
                }
                if(doc.room != null) {
                    doc.room = rooms.find({_id: doc.room.building}).fetch()[0]
                }
                if(doc.lecturer != null) {
                    doc.lecturer = lecturers.find({_id: doc.lecturer.fio}).fetch()[0]
                }
                if(doc.group != null) {
                    doc.group = groups.find({_id: doc.group.name}).fetch()[0]
                }

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

    Template.listGroups.events({
        'click #downloadSchedule': function(event) {
            var groupName = this.name

            Meteor.call('downloadExcelFile', groupName, function(err, fileUrl) {
                var link = document.createElement("a");
                link.download = 'Расписание.xlsx';
                link.href = fileUrl;
                link.click();
            });

        }
    });

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
        },
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

    Meteor.methods({
        downloadExcelFile : function(groupName) {
            var Future = Npm.require('fibers/future');
            var futureResponse = new Future();

            var excel = new Excel('xlsx'); // Create an excel object  for the file you want (xlsx or xls)
            var workbook = excel.createWorkbook(); // Create a workbook (equivalent of an excel file)
            var worksheet = excel.createWorksheet(); // Create a worksheet to be added to the workbook
            worksheet.writeToCell(0,0, 'Расписание группы ' + groupName); // Example : writing to a cell

            var sched = [];

            schedules.find({'group.name': groupName}).forEach(function(s) {
                if(s.weekday == 'Понедельник') {
                    sched.push({
                        'mon': {
                            pair: s.pair,
                            body: s.subject.title + ", " + s.room.number + " ("+ s.room.building +") " + s.lecturer.fio,
                            num: s.weeknumber
                        }
                    });
                } else
                if(s.weekday == 'Вторник') {
                    sched.push({
                        'tue': {
                            pair: s.pair,
                            body: s.subject.title + ", " + s.room.number + " ("+ s.room.building +") " + s.lecturer.fio,
                            num: s.weeknumber
                        }
                    });
                } else
                if(s.weekday == 'Среда') {
                    sched.push({
                        'wed': {
                            pair: s.pair,
                            body: s.subject.title + ", " + s.room.number + " ("+ s.room.building +") " + s.lecturer.fio,
                            num: s.weeknumber
                        }
                    });
                } else
                if(s.weekday == 'Четверг') {
                    sched.push({
                        'thu': {
                            pair: s.pair,
                            body: s.subject.title + ", " + s.room.number + " ("+ s.room.building +") " + s.lecturer.fio,
                            num: s.weeknumber
                        }
                    });
                } else
                if(s.weekday == 'Пятница') {
                    sched.push({
                        'fri': {
                            pair: s.pair,
                            body: s.subject.title + ", " + s.room.number + " ("+ s.room.building +") " + s.lecturer.fio,
                            num: s.weeknumber
                        }
                    });
                } else
                if(s.weekday == 'Суббота') {
                    sched.push({
                        'sat': {
                            pair: s.pair,
                            body: s.subject.title + ", " + s.room.number + " ("+ s.room.building +") " + s.lecturer.fio,
                            num: s.weeknumber
                        }
                    });
                }


            /*
                worksheet.writeToCell(row, 0, schedule.pair);
                worksheet.writeToCell(row, 1, schedule.weekday);
                worksheet.writeToCell(row, 2, schedule.subject.title);
                worksheet.writeToCell(row, 3, schedule.room.number);
                worksheet.writeToCell(row, 4, schedule.room.building);
                worksheet.writeToCell(row, 5, schedule.lecturer.fio);
            */
            });
            var monRow = 2 + 1;
            var tueRow = 2 + 14 + 1;
            var wedRow = 2 + 14*2 + 1;
            var thuRow = 2 + 14*3 + 1;
            var friRow = 2 + 14*4 + 1;
            var satRow = 2 + 14*5 + 1;

            worksheet.writeToCell(monRow, 1, 'Понедельник');
            worksheet.writeToCell(tueRow-1, 1, 'Вторник');
            worksheet.writeToCell(wedRow-1, 1, 'Среда');
            worksheet.writeToCell(thuRow-1, 1, 'Четверг');
            worksheet.writeToCell(friRow-1, 1, 'Пятница');
            worksheet.writeToCell(satRow-1, 1, 'Суббота');

            // Setting time

            worksheet.writeToCell(monRow+1, 0, '8:30');
            worksheet.writeToCell(monRow+3, 0, '10:15');
            worksheet.writeToCell(monRow+5, 0, '12:30');
            worksheet.writeToCell(monRow+7, 0, '14:15');
            worksheet.writeToCell(monRow+9, 0, '16:50');
            worksheet.writeToCell(monRow+11, 0, '18:00');

            worksheet.writeToCell(tueRow, 0, '8:30');
            worksheet.writeToCell(tueRow+2, 0, '10:15');
            worksheet.writeToCell(tueRow+4, 0, '12:30');
            worksheet.writeToCell(tueRow+6, 0, '14:15');
            worksheet.writeToCell(tueRow+8, 0, '16:50');
            worksheet.writeToCell(tueRow+10, 0, '18:00');

            worksheet.writeToCell(wedRow, 0, '8:30');
            worksheet.writeToCell(wedRow+2, 0, '10:15');
            worksheet.writeToCell(wedRow+4, 0, '12:30');
            worksheet.writeToCell(wedRow+6, 0, '14:15');
            worksheet.writeToCell(wedRow+8, 0, '16:50');
            worksheet.writeToCell(wedRow+10, 0, '18:00');

            worksheet.writeToCell(thuRow, 0, '8:30');
            worksheet.writeToCell(thuRow+2, 0, '10:15');
            worksheet.writeToCell(thuRow+4, 0, '12:30');
            worksheet.writeToCell(thuRow+6, 0, '14:15');
            worksheet.writeToCell(thuRow+8, 0, '16:50');
            worksheet.writeToCell(thuRow+10, 0, '18:00');

            worksheet.writeToCell(friRow, 0, '8:30');
            worksheet.writeToCell(friRow+2, 0, '10:15');
            worksheet.writeToCell(friRow+4, 0, '12:30');
            worksheet.writeToCell(friRow+6, 0, '14:15');
            worksheet.writeToCell(friRow+8, 0, '16:50');
            worksheet.writeToCell(friRow+10, 0, '18:00');

            worksheet.writeToCell(satRow, 0, '8:30');
            worksheet.writeToCell(satRow+2, 0, '10:15');
            worksheet.writeToCell(satRow+4, 0, '12:30');
            worksheet.writeToCell(satRow+6, 0, '14:15');
            worksheet.writeToCell(satRow+8, 0, '16:50');
            worksheet.writeToCell(satRow+10, 0, '18:00');


            sched.forEach(function(s){
                if(typeof(s.mon) != 'undefined') {
                    //worksheet.writeToCell(monRow, 0, s.mon.pair);
                    if(s.mon.num == "Первая") {
                        worksheet.writeToCell(monRow+s.mon.pair*2-1, 1, s.mon.body);
                    } else {
                        worksheet.writeToCell(monRow+s.mon.pair*2, 1, s.mon.body);
                    }
                }
                if(typeof(s.tue) != 'undefined') {
                    //worksheet.writeToCell(tueRow, 0, s.tue.pair);
                    if(s.tue.num == "Первая") {
                        worksheet.writeToCell(tueRow+s.tue.pair*2-1-1, 1, s.tue.body);
                    } else {
                        worksheet.writeToCell(tueRow+s.tue.pair*2-1, 1, s.tue.body);
                    }
                    //tueRow++;
                }
                if(typeof(s.wed) != 'undefined') {
                    //worksheet.writeToCell(wedRow, 0, s.wed.pair);
                    if(s.wed.num == "Первая") {
                        worksheet.writeToCell(wedRow+s.wed.pair*2-1-1, 1, s.wed.body);
                    } else {
                        worksheet.writeToCell(wedRow+s.wed.pair*2-1, 1, s.wed.body);
                    }
                    //wedRow++;
                }
                if(typeof(s.thu) != 'undefined') {
                    //worksheet.writeToCell(thuRow, 0, s.thu.pair);
                    if(s.thu.num == "Первая") {
                        worksheet.writeToCell(thuRow+s.thu.pair*2-1-1, 1, s.thu.body);
                    } else {
                        worksheet.writeToCell(thuRow+s.thu.pair*2-1, 1, s.thu.body);
                    }
                    //thuRow++;
                }
                if(typeof(s.fri) != 'undefined') {
                    //worksheet.writeToCell(friRow, 0, s.fri.pair);
                    if(s.fri.num == "Первая") {
                        worksheet.writeToCell(friRow+s.fri.pair*2-1-1, 1, s.fri.body);
                    } else {
                        worksheet.writeToCell(friRow+s.fri.pair*2-1, 1, s.fri.body);
                    }
                    //friRow++;
                }
                if(typeof(s.sat) != 'undefined') {
                    //worksheet.writeToCell(satRow, 0, s.sat.pair);
                    if(s.fri.num == "Первая") {
                        worksheet.writeToCell(satRow+s.sat.pair*2-1-1, 1, s.sat.body);
                    } else {
                        worksheet.writeToCell(satRow+s.sat.pair*2-1, 1, s.sat.body);
                    }
                    //satRow++;
                }

            });



            workbook.addSheet('MySheet', worksheet); // Add the worksheet to the workbook

            mkdirp('tmp', Meteor.bindEnvironment(function (err) {
                if (err) {
                    console.log('Error creating tmp dir', err);
                    futureResponse.throw(err);
                }
                else {
                    var uuid = UUID.v4();
                    var filePath = './tmp/' + uuid;
                    workbook.writeToFile(filePath);
                        temporaryFiles.importFile(filePath, {
                        filename : uuid,
                        contentType: 'application/octet-stream'
                    }, function(err, file) {
                        if (err) {
                            futureResponse.throw(err);
                        }
                        else {
                            futureResponse.return('/gridfs/temporaryFiles/' + file._id);
                        }
                    });
                }
            }));
            sched = {};
            return futureResponse.wait();
        }
    });

    Meteor.startup(function () {
        temporaryFiles.allow({
            insert: function (userId, file) {
                return true;
            },
            remove: function (userId, file) {
                return true;
            },
            read: function (userId, file) {
                return true;
            },
            write: function (userId, file, fields) {
                return true;
            }
        });
    })

}
