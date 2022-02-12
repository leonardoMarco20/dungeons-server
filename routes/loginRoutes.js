const passport = require('passport');
const express = require("express");
const app = express()
const router = require('express').Router()

const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')  ///logout?_method=DELETE

const initializePassport = require('../passport-config');

const { checkNotAuthenticated } = require('../controllers/auth.js')


initializePassport(
	passport,
	email => users.find(user => user.email === email),
  id => users.find(user => user.id === id),
)

app.use(flash())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


//router.get('/', checkNotAuthenticated, (req, res) => {
//  res.status(200).json(res)
//})

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))


router.delete('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})


module.exports = router