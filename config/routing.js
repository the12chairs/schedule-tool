Router.configure({
    layoutTemplate: 'layout'
});
if(Meteor.isClient){
    Router.map(function () {
        this.route('home', {
            path: '/',
            template: 'home'
        }),
        this.route('schedule', {
            path: '/schedule',
            template: 'listSchedules'
        }),
        this.route('chairs', {
            path: '/chairs',
            template: 'listChairs',
            onBeforeAction: function(pause) {
                if (!Meteor.user().role == 'redactor') {
                    this.render('home');
                    this.next();
                } else {
                    this.next();
                }
            }
        }),
        this.route('lecturers', {
            path: '/lecturers',
            template: 'listLecturers',
            onBeforeAction: function(pause) {
                if (!Meteor.user().role == 'redactor') {
                    this.render('home');
                    this.next();
                } else {
                    this.next();
                }
            }
        }),
        this.route('subjects', {
            path: '/subjects',
            template: 'listSubjects',
            onBeforeAction: function(pause) {
                if (!Meteor.user().role == 'redactor') {
                    this.render('home');
                    this.next();
                } else {
                    this.next();
                }
            }
        }),
        this.route('departaments', {
            path: '/departaments',
            template: 'listDepartaments',
            onBeforeAction: function(pause) {
                if (!Meteor.user().role == 'redactor') {
                    this.render('home');
                    this.next();
                } else {
                    this.next();
                }
            }
        }),
        this.route('rooms', {
            path: '/rooms',
            template: 'listRooms',
            onBeforeAction: function(pause) {
                if (!Meteor.user().role == 'redactor') {
                    this.render('home');
                    this.next();
                } else {
                    this.next();
                }
            }
        }),
        this.route('specialities', {
            path: '/specialities',
            template: 'listSpecialities',
            onBeforeAction: function(pause) {
                if (!Meteor.user().role == 'redactor') {
                    this.render('home');
                    this.next();
                } else {
                    this.next();
                }
            }
        }),
        this.route('groups', {
            path: '/groups',
            template: 'listGroups',
            onBeforeAction: function(pause) {
                if (!Meteor.user().role == 'redactor') {
                    this.render('home');
                    this.next();
                } else {
                    this.next();
                }
            }
        });
    });
}
