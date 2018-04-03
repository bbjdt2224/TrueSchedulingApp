import db from '../../database/models/index';
import * as Sequelize from 'sequelize';

 class ClassesController {

    getAllClasses(req, res) {
        if(req.session.passport.user) {
            db.classes.findAll({
                where: {
                    user: req.session.passport.user.id,
                    semester: req.params.semester,
                    year: req.params.year
                }
            }).then(
                classes => {
                    res.send(classes);
                },
                error => {
                    res.send(error);
                }
            );
        }
    }

    newClass(req, res) {
        if(req.session.passport.user) {
           db.classes.create({
               user: req.session.passport.user.id,
               semester: req.body.semester,
               year: req.body.year,
               days: req.body.days,
               start: req.body.start,
               end: req.body.end,
               title: req.body.title,
               building: req.body.building,
               room: req.body.room
           }).then(
               success => {
                   res.send(success);
               },
               error => {
                   res.send(error);
               }
           );
        }
    }

    getClass(req, res) {
        if(req.session.passport.user) {
            db.classess.findById(req.params.id).then(
                classes => {
                    res.send(classes);
                },
                error => {
                    res.send(error);
                }
            );
        }
    }

    editClass(req, res) {
        if(req.session.passport.user) {
           db.classes.update({
            days: req.body.days,
            start: req.body.start,
            end: req.body.end,
            title: req.body.title,
            building: req.body.building,
            room: req.body.room
           },{
               where: {
                   id: req.body.id
               }
           }).then(
               update => {
                   res.send(update);
               },
               error => {
                   res.send(error);
               }
           );
        }
    }

    deleteClass(req, res) {
        if(req.session.passport.user) {
            db.classes.findById(req.body.id).then(cls => {
                cls.destroy();
                res.send(null);
            });
        }
    }
}

export default new ClassesController();

