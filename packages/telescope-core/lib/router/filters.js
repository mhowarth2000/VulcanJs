// //--------------------------------------------------------------------------------------------------//
// //--------------------------------------------- Filters --------------------------------------------//
// //--------------------------------------------------------------------------------------------------//

// Router._filters = {

//   isReady: function () {
//     if (!this.ready()) {
//       // console.log('not ready')
//       this.render('loading');
//     }else{
//       this.next();
//       // console.log('ready')
//     }
//   },

//   clearSeenMessages: function () {
//     Messages.clearSeen();
//     this.next();
//   },

//   resetScroll: function () {
//     var scrollTo = window.currentScroll || 0;
//     var $body = $('body');
//     $body.scrollTop(scrollTo);
//     $body.css("min-height", 0);
//   },

//   isAdmin: function () {
//     if(!this.ready()) return;
//     if(!Users.is.admin()){
//       this.render('no_rights');
//     } else {
//       this.next();
//     }
//   },

//   canView: function () {
//     if(!this.ready() || Meteor.loggingIn()){
//       this.render('loading');
//     } else if (!Users.can.view()) {
//       this.render('no_invite');
//     } else {
//       this.next();
//     }
//   },

//   canPost: function () {
//     if(!this.ready() || Meteor.loggingIn()){
//       this.render('loading');
//     } else if(!Users.can.post()) {
//       Messages.flash(i18n.t("sorry_you_dont_have_permissions_to_add_new_items"), "error");
//       this.render('no_rights');
//     } else {
//       this.next();
//     }
//   },

//   hasCompletedProfile: function () {
//     if(!this.ready()) return;
//     var user = Meteor.user();
//     if (user && ! Users.userProfileComplete(user)){
//       this.render('user_complete');
//     } else {
//       this.next();
//     }
//   },

//   setSEOProperties: function () {

//     var props = {meta: {}, og: {}, twitter: {}};
//     var title = this.getTitle && this.getTitle();
//     var description = this.getDescription && this.getDescription();
//     var image = Settings.get("siteImage");

//     if (!!title) {
//       props.title = title;
//     }
    
//     if (!!description) {
//       props.meta.description = description;
//       props.og.description = description;
//     }
    
//     if (!!image) {
//       props.og.image = image;
//     }

//     if (!!Settings.get("twitterAccount")) {
//       props.twitter.site = Settings.get("twitterAccount");
//     }

//     SEO.set(props);

//     $('title').text(title);
//   },

//   setCanonical: function () {
//     var post = Posts.findOne(this.params._id);
//     if (post) {
//       SEO.set({link: {canonical: Posts.getPageUrl(post)}}, false);
//     }
//   }

// };

// var filters = Router._filters;

// Meteor.startup( function (){

//   if(Meteor.isClient){

//     // Load Hooks

//     Router.onBeforeAction( function () {

//       // if we're not on the search page itself, clear search query and field
//       if(Router.current().route.getName() !== 'search'){
//         Session.set('searchQuery', '');
//         $('.search-field').val('').blur();
//       }

//       this.next();

//     });

//     // onRun Hooks

//     // note: this has to run in an onRun hook, because onBeforeAction hooks can get called multiple times
//     // per route, which would erase the message before the user has actually seen it
//     // TODO: find a way to make this work even with HCRs.
//     Router.onRun(filters.clearSeenMessages);

//     // Before Hooks

//     Router.onBeforeAction(filters.isReady);
//     Router.onBeforeAction(filters.hasCompletedProfile, {except: ['atSignIn', 'atSignUp', 'atForgotPwd', 'atResetPwd', 'signOut']});
//     Router.onBeforeAction(filters.canView, {except: ['atSignIn', 'atSignUp', 'atForgotPwd', 'atResetPwd', 'signOut']});
//     Router.onBeforeAction(filters.isAdmin, {only: ['posts_pending', 'all-users', 'settings', 'toolbox', 'logs']});

//     Router.plugin('ensureSignedIn', {only: ['post_submit', 'post_edit', 'comment_edit']});

//     Router.onBeforeAction(filters.canPost, {only: ['posts_pending', 'post_submit']});

//     // After Hooks

//     Router.onAfterAction(Events.analyticsInit); // will only run once thanks to _.once()
//     Router.onAfterAction(Events.analyticsRequest); // log this request with mixpanel, etc
//     Router.onAfterAction(filters.setSEOProperties, {except: ["post_page", "post_page_with_slug"]}); // post pages have their own SEO logic
//     Router.onAfterAction(filters.setCanonical, {only: ["post_page", "post_page_with_slug"]});

//     // Unload Hooks

//     //

//   }

// });
