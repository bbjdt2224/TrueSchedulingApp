import * as express from 'express';

import GroupsController from './groups.controller';
import groupsController from './groups.controller';

export default (app: express.Express): void => {

    app.route('/api/group')
        .get(GroupsController.getAllUserGroups)
        .post(GroupsController.createGroup);

    app.post('/api/code', GroupsController.checkCode);

    app.post('/api/join', GroupsController.join);

};
