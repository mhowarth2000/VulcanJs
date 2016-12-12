import Telescope from 'meteor/nova:lib';
import escapeStringRegexp from 'escape-string-regexp';
import { Callbacks } from 'meteor/nova:core';

function addSearchQueryParameter (parameters, terms) {
  if(!!terms.query) {
    
    const query = escapeStringRegexp(terms.query);

    parameters = Telescope.utils.deepExtend(true, parameters, {
      selector: {
        $or: [
          {title: {$regex: query, $options: 'i'}},
          {url: {$regex: query, $options: 'i'}},
          // note: we cannot search the body field because it's not published
          // to the client. If we did, we'd get different result sets on 
          // client and server
          {excerpt: {$regex: query, $options: 'i'}}
        ]
      }
    });
  }
  return parameters;
}
Callbacks.add("posts.parameters", addSearchQueryParameter);