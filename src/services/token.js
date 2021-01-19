import jwt from 'jsonwebtoken';
import models from '../models';

async function checkToken (token) {
    let __id = null;
    try {
        const {_id} = await jwt.decode(token);
        __id = _id;
    } catch (error) {
        return false;
    }
    const user = await models.user.findOne({_id:__id, status:1});
    if (user) {
        const token = jwt.sign({_id:__id}, 'cHJveWVjdG9jYXNvc3ZpbGxhc2Fsb21l', {expiresIn:'1d'});
        return {token, role:user.role};
    } else{
        return false;
    }
}
export default {
    encode: async(_id, role, user_name) => {
        const token = jwt.sign({_id:_id, role:role, user_name:user_name}, 'cHJveWVjdG9jYXNvc3ZpbGxhc2Fsb21l', {expiresIn: '1d'});
        return token;
    },
    decode: async(token) => {
        try {
            const {_id} = await jwt.verify(token, 'cHJveWVjdG9jYXNvc3ZpbGxhc2Fsb21l');
            const user = await models.User.findOne({_id, status:1});
            if (user) {
                return user;
            } else{
                return false;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}