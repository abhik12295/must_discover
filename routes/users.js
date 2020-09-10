const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');




//User Model
const User = require('../models/User');


//Login Page

router.get('/login', (req, res) => res.render('login'));

//Sign Up page
router.get('/signup', (req, res) => res.render('signup'));


//Register Handle
router.post('/signup', (req, res) => {
	const { name, email, password, password2 } = req.body;
	let errors = [];


	//check required fields

	if(!name || !email || !password || !password2) {
		errors.push({ msg: 'Please fill in all the fields' });
		}

	//check password match

	if (password != password2){

		errors.push({ msg:  'Passwords do not match'});
	}

	//check password length


	if (password.length < 8)
	{
		errors.push({msg : 'Password should be atleast of 8 characters'});

	}

	if (errors.length > 0)
	{
		res.render('signup',{
			errors,
			name,
			email,
			password,
			password2
		});
	}

	else {
		//Validation Passed
		User.findOne({ email: email }).then(user => {
      if (user) {
      	//User Exists
        errors.push({ msg: 'Email already exists' });
        res.render('signup', {
          errors,
          name,
          email,
          password,
          password2
        });
	}
	else {
        const newUser = new User({
          name,
          email,
          password
        });

        // console.log(newUser)
        // res.send('hello');

        //hash password
        bcrypt.genSalt(10,(err,salt) =>
        	bcrypt.hash(newUser.password,salt,(err,hash) => {
        		if(err) throw err;

        		//Set password to hash
        		newUser.password = hash;
        		//Save user
        		newUser.save()
        		.then(user => {
        			req.flash('success_msg','You are now registered and can Log In');
        			res.redirect('/users/login');
        		})
        		.catch(err=>console.log(err));
        	}))
    }

});	
	}

});

//Login Handle
router.post('/login',(req,res,next) => {
	passport.authenticate('local',{
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req,res,next);
});


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports= router;