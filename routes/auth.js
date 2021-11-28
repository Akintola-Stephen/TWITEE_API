const express = require('express')
const router = express.Router()
const { login, register } = require('../controllers/auth')
const authMiddleWare = require('../middleware/auth')

router.post('/register', (req, res) => register);
router.post('/login', (req, res) => login);

module.export = router