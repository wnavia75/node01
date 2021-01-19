import mongoose, {Schema} from 'mongoose';

const loanSchema = new Schema({

    affiliate: {
        type: Schema.ObjectId, ref:'affiliate', required: true
    },//Afiliado
    code: {
        type: Number, maxlength: 30, unique: true, required: true
    },//Numero de Prestamo
    voucher: {
        type: Number, maxlength: 30, required: true
    },// Comprobante
    request_date: {
        type: Date, required: true, transform: val => val.toISOString().substring(0,10)
    },//Fecha de Solicitud
    debt_date: {
        type: Date
    },//reconocimiento de deuda
    amount_requested: {
       type: Number, required: true
    },//Monto Solicitado
    loan_term: {
       type: Number, required: true
    },//Plazo en meses
    amortization: {
       type: Number, required: true
    },//Amortizacion
    interest_rate: {
        type: Number, required: true
     },//Tasa de interes
    type: {
        type: String, required: true
     },//Tipo de tramite
    status: {
        type: String, maxlength: 30, required: true
    }//Estado
});

const Loan = mongoose.model('loan', loanSchema);

export default Loan;