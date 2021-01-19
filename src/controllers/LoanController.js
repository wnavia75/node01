import models from '../models';

export default {
    add: async(req, res, next) => {
        try {
            const reg = await models.Loan.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    },
    queryint:async(req, res, next) => {
        try {
            const reg = await models.Loan.findOne({_id:req.query._id})
            .populate('affiliate', {name:1,registration:1});
            let loan_id = reg._id;
            let loan_amount_requested = reg.amount_requested;
            const last_payment = await models.Payment.findOne({loan:loan_id}).sort({'_id': -1 })
            if (last_payment) {
                await models.Payment.create(
                    {
                        loan:loan_id,
                        date:"2020-10-15",
                        transaction_date:"2020-10-15",
                        t_c:5.25,
                        interest:parseFloat((((12/100)/360)*90*parseFloat(last_payment.balance))).toFixed(2),
                        receipt:"OPRO",
                        balance:parseFloat(parseFloat((((12/100)/360)*90*parseFloat(last_payment.balance)))+ parseFloat(last_payment.balance)).toFixed(2)
                    
                    });               
            }else{
                await models.Payment.create(
                    {
                        loan:loan_id,
                        date:"2020-10-15",
                        transaction_date:"2020-10-15",
                        t_c:5.25,
                        interest:parseFloat((((12/100)/360)*90*parseFloat(loan_amount_requested))).toFixed(2),
                        receipt:"OPRO",
                        balance:parseFloat(parseFloat((((12/100)/360)*90*parseFloat(loan_amount_requested)))+ parseFloat(loan_amount_requested)).toFixed(2)
                    
                    }); 
            }

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
    queryaccint:async(req, res, next) => {
        try {
            const reg = await models.Loan.findOne({_id:req.query._id})
            .populate('affiliate', {name:1,registration:1});
            let loan_id = reg._id;
            let loan_amount_requested = reg.amount_requested;
            const last_payment = await models.Payment.findOne({loan:loan_id}).sort({'_id': -1 })
            if (last_payment) {
                await models.Payment.create(
                    {
                        loan:loan_id,
                        date:"2020-10-15",
                        transaction_date:"2020-10-15",
                        t_c:5.25,
                        estimated_quota:0,
                        quota:0,
                        other_charge:0,
                        d_c:0,
                        interest:parseFloat((((12/100)/360)*270*parseFloat(last_payment.balance))).toFixed(2),
                        accumulated_interest:parseFloat((((12/100)/360)*270*parseFloat(last_payment.balance))).toFixed(2),
                        total:0,
                        receipt:"OPRO",
                        registry:0,
                        balance:parseFloat(parseFloat((((12/100)/360)*270*parseFloat(last_payment.balance)))*2 + parseFloat(last_payment.balance)).toFixed(2)
                    });               
            }else{
                await models.Payment.create(
                    {
                        loan:loan_id,
                        date:"2020-10-15",
                        transaction_date:"2020-10-15",
                        t_c:5.25,
                        estimated_quota:0,
                        quota:0,
                        other_charge:0,
                        d_c:0,
                        interest:parseFloat((((12/100)/360)*270*parseFloat(loan_amount_requested))).toFixed(2),
                        accumulated_interest:parseFloat((((12/100)/360)*270*parseFloat(loan_amount_requested))).toFixed(2),
                        total:0,
                        receipt:"OCAS",
                        registry:0,
                        balance:parseFloat(parseFloat((((12/100)/360)*270*parseFloat(loan_amount_requested)))*2 + parseFloat(loan_amount_requested)).toFixed(2)
                    });  
            }
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
            //const reg = await models.Loan.find({$or:[{'code': new RegExp(valor, 'i')},{'voucher': new RegExp(valor, 'i')}]},{createdAt:0})
            const reg = await models.Loan.find({})
            .populate('affiliate', {})
            .sort({'code':1});
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
            const reg = await models.Loan.findByIdAndUpdate({_id:req.body._id}, {
                code:req.body.code,
                voucher:req.body.voucher,
                exchange_rate:req.body.exchange_rate,
                request_date:req.body.request_date,
                debt_date:req.body.debt_date,
                amount_requested:req.body.amount_requested,
                loan_term:req.body.loan_term,
                amortization:req.body.amortization
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
            const reg = await models.Loan.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.Loan.findByIdAndUpdate({_id:req.body._id},{status:1});
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
            const reg = await models.Loan.findByIdAndUpdate({_id:req.body._id},{status:0});
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Internal server error'
            });
            next(e);
        }
    }
}