import models from '../models';
import moment from "moment";

export default {

    add:async(req, res, next) => {
        try {
            if(req.body.liquidate) {
                const loan = await models.Loan.findOne({_id:req.body.loan});
                const last_payment = await models.Payment.findOne({loan:req.body.loan}).sort({'_id': -1 });
                var last_date = moment(last_payment.date).format('YYYY-MM-DD');
                var remission = moment(loan.debt_date.toISOString().substring(0,10)).format('YYYY-MM-DD');
                var date_calc = moment(loan.debt_date.toISOString()).endOf('month').format('YYYY-MM-DD');
                var dateaux =  moment(date_calc).format('DD') - moment(remission).format('DD');
                if(dateaux<=15){
                    var date_calc = moment(loan.debt_date.toISOString()).add(1,'months').endOf('month').format('YYYY-MM-DD');
                }
                var days= moment(date_calc).diff(last_date, 'days');
                if (days<=30) {
                    var quota0 = parseFloat(Math.round(last_payment.balance * 100) / 100).toFixed(2);
                    var interest0 = parseFloat((((12/100)/360)*days*quota0)).toFixed(2);
                    var total0 = parseFloat(parseFloat(quota0)+ parseFloat(interest0)).toFixed(2);
                    const reg = await models.Payment.create({
                        loan:req.body.loan,
                        date:date_calc,
                        transaction_date:req.body.transaction_date,
                        quota: quota0,
                        interest:interest0,
                        total:total0,
                        receipt:req.body.receipt,
                        registry:req.body.registry,
                        glosa:req.body.glosa,
                        balance:0      

                    });
                    res.status(200).json(reg);
                }else {
                    var quota0 = parseFloat(Math.round(last_payment.balance * 100) / 100).toFixed(2);
                    var interest0 = parseFloat((((12/100)/360)*days*quota0)).toFixed(2);
                    var interest1 = parseFloat((((12/100)/360)*(days-30)*quota0)).toFixed(2);
                    var total0 = parseFloat(parseFloat(quota0)+ parseFloat(interest0)+ parseFloat(interest1)).toFixed(2);
                    const reg = await models.Payment.create({
                        loan:req.body.loan,
                        date:date_calc,
                        transaction_date:req.body.transaction_date,
                        quota: quota0,
                        interest:interest0,
                        accumulated_interest:interest1,
                        total:total0,
                        receipt:req.body.receipt,
                        registry:req.body.registry,
                        glosa:req.body.glosa,
                        balance:0      

                    });
                }

            }else{
                const last_payment = await models.Payment.findOne({loan:req.body.loan}).sort({'_id': -1 })
                console.log("LOG F: "+req.body.total);
            
                const reg = await models.Payment.create({
                loan:req.body.loan,
                date:req.body.date,
                transaction_date:req.body.transaction_date,
                quota: parseFloat(Math.round(req.body.total * 100) / 100).toFixed(2),
                total:parseFloat(Math.round(req.body.total * 100) / 100).toFixed(2),
                receipt:req.body.receipt,
                registry:req.body.registry,
                glosa:req.body.glosa,
                balance:parseFloat(parseFloat(last_payment.balance)- parseFloat(req.body.total)).toFixed(2)      
                });
            }
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    },
    query:async(req, res, next) => {
        try {
            const reg = await models.Payment.findOne({_id:req.query._id})
            .populate('loan', {code:1})
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
            const reg = await models.Payment.find({"loan":req.query.loan_id})
            .populate('loan', {});
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
            const reg = await models.Payment.findByIdAndUpdate({_id:req.body._id}, {
                registry:req.body.registry,
                glosa:req.body.glosa,
                receipt:req.body.receipt,
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
            const last_payment = await models.Payment.findOne({loan:req.body.loan}).sort({'_id': -1 });
            const reg = await models.Payment.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.Payment.findByIdAndUpdate({_id:req.body._id},{status:1});
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
            const reg = await models.Payment.findByIdAndUpdate({_id:req.body._id},{status:0});
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    },
    totals:async(req, res, next) => {
            try {
                const reg = await models.Payment.aggregate(
                    [
                        {
                            $group:{
                                _id:{

                                },
                                total_quota:{$sum:"$quota"},
                                total_other_charge:{$sum:"$other_charge"},
                                total_interest_payment:{$sum:"$interest_payment"},
                                number: {$sum:1}
                            }
                        }
                    ]
                );
                res.status(200).json(reg);
            } catch (e) {
                res.status(500).send({
                    message:'Internal server error'
                });
                next(e);
            }
    }
}