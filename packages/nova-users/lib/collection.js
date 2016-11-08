import Telescope from 'meteor/nova:lib';

/**
 * @summary Telescope Users namespace
 * @namespace Users
 */
const Users = Meteor.users;

Telescope.subscriptions.preload("users.current");

Users.typeName = 'User';

export default Users;