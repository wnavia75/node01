import routerx from 'express-promise-router';
import affiliateRouter from './affiliate';
import loanRouter from './loan';
import paymentRouter from './payment';
import userRouter from './user';


const router = routerx();

router.use('/affiliate', affiliateRouter);
router.use('/loan', loanRouter);
router.use('/payment', paymentRouter);
router.use('/user', userRouter);


export default router;