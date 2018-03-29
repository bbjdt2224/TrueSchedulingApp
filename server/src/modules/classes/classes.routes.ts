import * as express from 'express';

import ClassesController from './classes.controller';

export default (app: express.Express): void => {

    app.route('/api/classes/:year/:semester')
        .get(ClassesController.getAllClasses)
        .post(ClassesController.newClass);

    app.route('/api/class/:id')
        .get(ClassesController.getClass)
        .put(ClassesController.editClass);

    app.route('/api/delete')
        .post(ClassesController.editClass);

};
