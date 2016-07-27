import PublicationUtils from 'meteor/utilities:smart-publications'
import Posts from "meteor/nova:posts"
import Users from "meteor/nova:users"

// check if user can subscribe to post
const canSubscribe = user => Users.canDo(user, "posts.new");

Users.addField({
  fieldName: 'telescope.subscribedItems',
  fieldSchema: {
    type: Object,
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  }
});

PublicationUtils.addToFields(
  Users.publishedFields.list, ["telescope.subscribedItems"]
)

Posts.addField(
  {
    fieldName: 'subscribers',
    fieldSchema: {
      type: [String],
      control: "checkboxgroup",
      optional: true,
      insertableIf: canSubscribe,
      autoform: {
        // omit: true
        noselect: true,
        type: "bootstrap-category",
        order: 50,
        options: function () {
          var subscribers = [{
            value: "123",
            label: "razdwatrzy"
          }];
          return subscribers;
        }
      },
      publish: true,
      join: {
        joinAs: "subscribersArray",
        collection: () => Users
      }
    }
  }
);

Posts.addField({
  fieldName: 'subscriberCount',
  fieldSchema: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

PublicationUtils.addToFields(
  Posts.publishedFields.list, ["subscribers", "subscriberCount"]
)
