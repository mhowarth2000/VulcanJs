import { Components, registerComponent } from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import NovaForm from "meteor/nova:forms";
import Users from 'meteor/nova:users';
import { ShowIf, withCurrentUser, withSingle, withMessages } from 'meteor/nova:core';
import gql from 'graphql-tag';

const UsersEditForm = (props, context) => {
  return (
    <ShowIf
      check={Users.options.mutations.edit.check}
      document={{_id: props.document._id}}
      failureComponent={<FormattedMessage id="app.noPermission"/>}
    >
      <div className="page users-edit-form">
        <h2 className="page-title users-edit-form-title"><FormattedMessage id="users.edit_account"/></h2>
        <NovaForm 
          collection={Users} 
          documentId={props.document._id}
          queryToUpdate="usersSingleQuery"
          successCallback={(user)=>{
            props.flash(context.intl.formatMessage({id: "users.edit_success"}, {name: Users.getDisplayName(user)}), 'success')
          }}
          showRemove={true}
        />
      </div>
    </ShowIf>
  );
};


UsersEditForm.propTypes = {
  document: React.PropTypes.object,
};

UsersEditForm.contextTypes = {
  intl: intlShape
};

UsersEditForm.displayName = "UsersEditForm";

UsersEditForm.fragment = gql` 
  fragment UsersEditFormFragment on User {
    _id
    __slug
  }
`;

const options = {
  collection: Users,
  queryName: 'UsersEditFormQuery',
  fragment: UsersEditForm.fragment,
};

registerComponent('UsersEditForm', UsersEditForm, withCurrentUser, withSingle(options), withMessages);