function checkAuthenticated(req,res, next) {
  console.log(req)
  if(req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  console.log(req)
  if(req.isAuthenticated()) {
    return res.redirect('/')
  }
  
  next()
}


module.exports = {checkAuthenticated, checkNotAuthenticated}