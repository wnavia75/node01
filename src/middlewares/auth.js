import tokenService from '../services/token';

export default {
    verifyUser: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.role == 'admin' || response.role == 'cobranzas') {
            next();
        }   else{
            return res.status(403).send({
                message: 'unauthorized user'
            })
        }
    },
    verifyAdmin: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.role == 'admin') {
            next();
        }   else{
            return res.status(403).send({
                message: 'unauthorized user'
            })
        }
    },
    verifyCobranzas: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.role == 'cobranzas') {
            next();
        }   else{
            return res.status(403).send({
                message: 'unauthorized user'
            })
        }
    }

}