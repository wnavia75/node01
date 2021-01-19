import routerx from 'express-promise-router';
import paymentController from '../controllers/PaymentController';
import auth from '../middlewares/auth';


const router = routerx();

router.post('/add', auth.verifyUser, paymentController.add);
router.get('/query', auth.verifyUser, paymentController.query);
router.get('/list', auth.verifyUser, paymentController.list);
router.put('/update', auth.verifyUser, paymentController.update);
router.delete('/remove', auth.verifyUser, paymentController.remove);
router.put('/activate', auth.verifyUser, paymentController.activate);
router.put('/deactivate', auth.verifyUser, paymentController.deactivate);

router.get('/totals', paymentController.totals);

export default router;