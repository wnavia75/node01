import mongoose, {Schema} from 'mongoose';

const affiliateSchema = new Schema({

    last_name: {
        type: String, maxlength: 50, required: true
    },//Apellido Paterno
    mothers_last_name: {
        type: String, maxlength: 50, required: true
    },//Apellido Materno
    surname_husband: {
        type: String, maxlength: 50
    },//Apellido de esposo
    name: {
        type: String, maxlength: 50, required: true
    },//Nombre Completo
    identity_card: {
        type: String
    }//Carnet de Identidad
});

const Affiliate = mongoose.model('affiliate', affiliateSchema);

export default Affiliate;