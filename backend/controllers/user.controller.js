/* eslint-disable keyword-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable arrow-spacing */
/* eslint-disable object-curly-spacing */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */

let User = require('../models/user.model').User;
let TokenService = require('../services/TokenService');
/* eslint-disable space-before-blocks */
let saveUser = function (req, res){
  console.log(req.body);
  // eslint-disable-next-line no-undef
  let userObject = new User(req.body);

  userObject.setPassword(req.body.password).then(function (){
    userObject.save().then(saveduser => {
      let token = TokenService.generateToken({user_id: saveduser._id.toString()});
      res.send({token: token, user:saveduser});
  })

    .catch(error => {
      console.log(error);
      res.status(403).send({ errorMessage: 'There was an error' });
    });
  });
};
let getAllUsers = function (req, res){
    User.find({}).then(users =>{
        //res.render('pages/detail.ejs', {users : users, error: null});
        res.send({users:users});
    })
    .catch(error => {
        console.log(error);
        res.status(500).send({ errorMessage: 'There was an error' });
      });
};
let addUser = function (req, res){
    res.render('pages/user.ejs');
};

let getUser = function (req, res){
    User.findById(req.params.userId).then(user=>{
        res.send(user);
    });
};
let deleteUser = function (req, res) {
  // eslint-disable-next-line space-before-function-paren
  User.remove({_id: req.params.userId}, function(err) {
    if (!err) {
        return res.send('User deleted!');
    } else {
        return res.send('Error deleting user!');
    }
  });
};

let loadLogin = function (req, res) {
  res.render('pages/login.ejs');
};

let loginUser = function (req, res, next) {
  // eslint-disable-next-line no-var
  var authenticate = User.authenticate();
  console.log(req.body);
  authenticate(req.body.username, req.body.password, function (error, success) {
    console.log(error, success);
    if(success){
      let token = TokenService.generateToken({user_id: success._id.toString()});
      res.send({token: token, user:success});
    } else {
      res.status(403).send({message: 'Unauthorized'});
    }
  });
};

/**
 * finds all users who are online
 * @param req
 * @param res
 */
let getUsersOnline =  function (req, res){
  User.find({status: 'online'}).then( users =>{
    res.send(users);
  })
  .catch (error => {
    console.log(error);
    res.render('allusers.ejs', {error : 'There was an error in getting the users'});
  });
};





module.exports.saveUser = saveUser;
module.exports.getAllUsers = getAllUsers;
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.deleteUser =  deleteUser;
module.exports.loginUser = loginUser;
module.exports.loadLogin = loadLogin;
module.exports.getUsersOnline = getUsersOnline;