import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token';

export default {
    add: async(req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password,10);
            const reg = await models.User.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error -add'
            });
            next(e);
        }
    },
    query:async(req, res, next) => {
        try {
            const reg = await models.User.findOne({_id:req.query._id});
            if (!reg) {
                res.status(404).send({
                    message:'The record does not exist'
                })
            }else{
                res.status(200).json(reg);
            }
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    },
    list:async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.User.find({$or:[{'identity_card': new RegExp(valor, 'i')},{'name': new RegExp(valor, 'i')}]},{createdAt:0})
            .sort({'name':1});
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    },
    update:async(req, res, next) => {
        try {
            let pass = req.body.password;
            const reg0 = await models.User.findOne({_id:req.body._id});
            if (pass!=reg0.password) {
                req.body.password = await bcrypt.hash(req.body.password,10);
            }
            const reg = await models.User.findByIdAndUpdate({_id:req.body._id}, {
                role:req.body.role,
                identity_card:req.body.identity_card,
                name:req.body.name,
                user_name:req.body.user_name,
                password:req.body.password,
            });
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    },
    remove:async(req, res, next) => {
        try {
            const reg = await models.User.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    },
    activate:async(req, res, next) => {
        try {
            const reg = await models.User.findByIdAndUpdate({_id:req.body._id},{status:1});
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    },
    deactivate:async(req, res, next) => {
        try {
            const reg = await models.User.findByIdAndUpdate({_id:req.body._id},{status:0});
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    },
    login: async (req, res, next) => {
        try {
            let user = await models.User.findOne({user_name: req.body.user_name});
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user._id, user.role, user.user_name);
                    res.status(200).json({user, tokenReturn});
                }else{
                    res.status(404).send({
                        message:'Incorrect password'
                    });
                }
            }else{
                res.status(404).send({
                    message:'user does not exist'
                });
            }
        } catch (e) {
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);    
        }
    }
}