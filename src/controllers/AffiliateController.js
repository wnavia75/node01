import models from '../models';

export default {
    add: async(req, res, next) => {
        try {
            const reg = await models.Affiliate.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    },
    query:async(req, res, next) => {
        try {
            const reg = await models.Affiliate.findOne({_id:req.query._id});
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
            const reg = await models.Affiliate.find({$or:[{'name': new RegExp(valor, 'i')},{'identity_card': new RegExp(valor, 'i')}]},{createdAt:0})
            .sort({'_id':1});
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
            const reg = await models.Affiliate.findByIdAndUpdate({_id:req.body._id}, 
                {
                    name:req.body.name, 
                    last_name:req.body.last_name,
                    mothers_last_name:req.body.mothers_last_name,
                    surname_husband:req.body.surname_husband,
                    identity_card:req.body.identity_card
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
            const reg = await models.Affiliate.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.Affiliate.findByIdAndUpdate({_id:req.body._id},{status:1});
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
            const reg = await models.Affiliate.findByIdAndUpdate({_id:req.body._id},{status:0});
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    }
}