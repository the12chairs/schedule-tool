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
