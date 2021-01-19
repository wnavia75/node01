import mongoose, {Schema} from 'mongoose';

const paymentSchema = new Schema({

    loan: {
        type: Schema.ObjectId, ref:'loan', required: true
    },//Prestamo
    date: {
        //type: Date, required: true, transform: val => (val.getDate()+ 1) + "/" + (val.getMonth() + 1)  + "/" + val.getFullYear()
        type: Date, required: true, transform: val => val.toISOString().substring(0,10)
    },//Fecha de calculo
    transaction_date: {
        //type: Date, required: true, transform: val => (val.getDate()+ 1) + "/" + (val.getMonth() + 1)  + "/" + val.getFullYear()
        type: Date, required: true, transform: val => val.toISOString().substring(0,10), default: Date.now
    },//Fecha de transaccion
    t_c: {
        type: Number, default:0
    },//Tipo de Cambio
    estimated_quota: {
        type: Number, default:0
    },//Monto Estimado
    quota: {
        type: Number, default:0
    },//Monto para Amortizar
    other_charge: {
        type: Number, default:0
    },//otro Cobro
    interest: {
       type: Number, default:0
    },//interes Corriente
    d_c: {
       type: Number, default:0
    },//D/C
    accumulated_interest: {
       type: Number, default:0
    },//Interes Penal
    total: {
        type: Number, default:0
    },//Pago Amortizado
    balance: {
        type: Number, default:0
    },//Saldo Capital
    receipt: {
        type: String
    },//Tipo de Pago
    registry: {
        type: String, default:0
    },//numero de registro
    glosa: {
        type: String
    },//detalle de transaccion
    createdAt: {
        type: Date, default: Date.now
    }
});

const Payment = mongoose.model('payment', paymentSchema);

export default Payment;