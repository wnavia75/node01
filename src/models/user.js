import mongoose, {Schema} from 'mongoose';

const userSchema = Schema({
    role: {
        type: String, maxlength: 30, required: true
    },
    identity_card: {
        type: String, maxlength: 20, required: true
    },
    name: {
        type: String, maxlength: 30, required: true
    },
    user_name: {
        type: String, maxlength: 30, unique: true, required: true
    },
    password: {
        type: String, maxlength: 64, required: true
    },
    status: {
        type: Number, default: 1
    },
    createdAt: {
        type: Date, default: Date.now
    }
});

const User = mongoose.model('user', userSchema);

export default User;