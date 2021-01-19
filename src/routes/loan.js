import routerx from 'express-promise-router';
import loanController from '../controllers/LoanController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyUser, loanController.add);
router.get('/queryint', auth.verifyUser, loanController.queryint);
router.get('/queryaccint', auth.verifyUser, loanController.queryaccint);
router.get('/list', auth.verifyUser, loanController.list);
router.put('/update', auth.verifyUser, loanController.update);
router.delete('/remove', auth.verifyUser, loanController.remove);
router.put('/activate', auth.verifyUser, loanController.activate);
router.put('/deactivate', auth.verifyUser, loanController.deactivate);

export default router;
