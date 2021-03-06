/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Admin from './Admin';

const title = 'Admin Page';

function action(context, params) {
  if (context.admin === false) {
    return { redirect: '/login' };
  }

  return {
    chunks: ['admin'],
    title,
    component: <Admin title={title} params={params} context={context} />,
  };
}

export default action;
