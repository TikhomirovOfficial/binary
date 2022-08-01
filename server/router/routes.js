const Router = require("express").Router;
const UserController = require('../controllers/UserController');
const AuctionController = require('../controllers/AuctionController');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const router = new Router();

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refresh);

router.get('/users', authMiddleware, adminMiddleware, UserController.getUsers);
router.post('/register', authMiddleware, adminMiddleware, UserController.registration);
router.put('/subscribe', authMiddleware, adminMiddleware, UserController.changeUserSubscribe);
router.put('/brokers', authMiddleware, adminMiddleware, UserController.changeUserBrokers);
router.post('/destroy', authMiddleware, adminMiddleware, UserController.destroy);


router.post('/auction/join', authMiddleware,  AuctionController.joinUser)

router.get('/auction/users', authMiddleware, adminMiddleware, AuctionController.getUsers)
router.post('/auction/destroy', authMiddleware, AuctionController.destroy)
router.get('/auction/user', authMiddleware, AuctionController.getByUserId)
router.put('/auction/deal', authMiddleware, adminMiddleware, AuctionController.changeDeal)
router.put('/auction/deals', authMiddleware, adminMiddleware, AuctionController.changeDealAll)
router.put('/auction/message', authMiddleware, adminMiddleware, AuctionController.changeMessage)
router.put('/auction/stop', authMiddleware, adminMiddleware, UserController.changeUserStopMessage)
router.put('/auction/allstop', authMiddleware, adminMiddleware, UserController.stopAll)

module.exports = router;