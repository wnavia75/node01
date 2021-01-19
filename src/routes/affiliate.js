import routerx from 'express-promise-router';
import affiliateController from '../controllers/AffiliateController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyUser, affiliateController.add);
router.get('/query', auth.verifyUser, affiliateController.query);
router.get('/list', auth.verifyUser, affiliateController.list);
router.put('/update', auth.verifyUser, affiliateController.update);
router.delete('/remove', auth.verifyUser, affiliateController.remove);
router.put('/activate', auth.verifyUser, affiliateController.activate);
router.put('/deactivate', auth.verifyUser, affiliateController.deactivate);

export default router;
