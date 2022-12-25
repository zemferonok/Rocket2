const apiRouter = require('express').Router();

const userRouter = require('./user/user.router.js');

apiRouter.use('/users', userRouter);
apiRouter.use('/', (req, res) => {
    res.json('API HYIAPI, Wrong URL');
});

module.exports = apiRouter;