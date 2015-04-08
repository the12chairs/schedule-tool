Router.configure({
    layoutTemplate: 'layout'
});

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
        template: 'listChairs'
    }),
    this.route('lecturers', {
        path: '/lecturers',
        template: 'listLecturers'
    }),
    this.route('subjects', {
        path: '/subjects',
        template: 'listSubjects'
    }),
    this.route('departaments', {
        path: '/departaments',
        template: 'listDepartaments'
    }),
    this.route('rooms', {
        path: '/rooms',
        template: 'listRooms'
    }),
    this.route('specialities', {
        path: '/specialities',
        template: 'listSpecialities'
    }),
    this.route('groups', {
        path: '/groups',
        template: 'listGroups'
    })
})

/*
Router.route('/chairs', function () {
  this.render('listChairs')
})
Router.route('/chair/create', function () {
  this.render('chairsForm')
})
Router.route('/lecturers', function() {
    this.render('listLecturers')
})
Router.route('/lecturer/create', function() {
    this.render('lecturersForm')
})
Router.route('/subjects', function() {
    this.render('listSubjects')
})
Router.route('/subject/create', function() {
    this.render('subjectsForm')
})
Router.route('/departaments', function() {
    this.render('listDepartaments')
})
Router.route('/departament/create', function() {
    this.render('departamentsForm')
})*/
