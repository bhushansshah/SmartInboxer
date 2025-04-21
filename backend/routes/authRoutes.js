const { googleLogin } = require('../controllers/auth');

const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send('Auth route is working!');
}
);

router.post('/login', googleLogin)
module.exports = router;