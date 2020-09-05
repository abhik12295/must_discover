const express = require ('express');
const router = express.Router();


//Login Page

router.get('/login', (req, res) => res.render('login'));

//Sign Up page
router.get('/signup', (req, res) => res.render('signup'));


module.exports= router;