module.exports = (app, express) => {
  const router = express.Router();
  const {
    login,
    signUp,
    savePushToken,
  } = require('../controllers/auth.controller');

  router.post('/login', login);

  router.post('/signup', signUp);

  app.use('/api/v1', router);
};
