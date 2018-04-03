import db from '../../database/models/index';
import * as Sequelize from 'sequelize';

 class GroupsController {

    getAllUserGroups(req, res) {
        db.groupRelation.findAll({
            where: {
                userId: req.session.passport.user.id
            },
            include: [
                db.groups
            ]
        }).then(groups => {
            res.send(groups);
        });
    }

    createGroup(req, res) {
        db.groups.create({
            groupName: req.body.groupName,
            groupCode: req.body.groupCode,
            creatorId: req.session.passport.user.id
        }).then(success => {
            db.groupRelation.create({
                userId: req.session.passport.user.id,
                groupId: success.id
        }).then(success => {res.send(success);}, fail => {res.send(fail);});
    } , fail => {res.send(fail);});
    }

    checkCode(req, res) {
        db.groups.findOne({
            where: {
                groupCode: req.body.code
            }
        }).then(group => {
            if(group) {
                res.send(false);
            }
            else {
                res.send(true);
            }
        });
    }

    join(req, res) {
        db.groups.findOne({
            where: {
                groupCode: req.body.code
            }
        }).then(group => {
            if(group) {
                db.groupRelation.create({
                    userId: req.session.passport.user.id,
                    groupId: group.id
                }).then(relateion => res.send(relateion));
            }
            else {
                res.send({message: 'fail'});
            }
        });
    }
}

export default new GroupsController();

