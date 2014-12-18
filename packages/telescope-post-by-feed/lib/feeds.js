// feedSchema schema
feedSchema = new SimpleSchema({
 _id: {
    type: String,
    optional: true
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  }
});

Feeds = new Meteor.Collection("feeds", {
  schema: feedSchema
});

Meteor.startup(function () {
  Feeds.allow({
    remove: isAdminById
  });

  Meteor.methods({
    insertFeed: function(feedUrl){
      check(feedUrl, feedSchema);

      if (Feeds.findOne({url: feedSchema.url}))
        throw new Meteor.Error('already-exists', i18n.t('feed_already_exists'));

      if (!Meteor.user() || !isAdmin(Meteor.user()))
        throw new Meteor.Error('login-required', i18n.t('you_need_to_login_and_be_an_admin_to_add_a_new_feed'));

      return Feeds.insert(feedUrl);
    }
  });
});
