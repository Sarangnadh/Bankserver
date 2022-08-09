//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import db.js
const db = require('./db')

// db = {
//    1000: { "acno": 1000, "username": "sarang", "password": 1000, "balance": 5000, transaction: [] },
// 1001: { "acno": 1001, "username": "akhil", "password": 1001, "balance": 5000, transaction: [] },
// 1002: { "acno": 1002, "username": "ranjith", "password": 1002, "balance": 5000, transaction: [] },
// 1003: { "acno": 1003, "username": "vrijith", "password": 1003, "balance": 5000, transaction: [] },
//   }

const register = (username, acno, password) => {
  //asynchronous
  return db.User.findOne({
    
    acno
  }).then(user => {

    if (user) {
      return {
        status: false,
        message: "Existing user!! Please Login",
        StatusCode: 401
      }
    }
    else {
      //insert data base
      const newUser = new db.User({
        acno,
        username,
        password,
        balance: 0,
        transaction: []

      })
      newUser.save()
      return {
        status: true,
        message: "Register successfully..",
        StatusCode: 200
      }
    }

  })
}

//login
const login = (acno, pswd) => {

  return db.User.findOne({
    acno,
    password: pswd
  }).then(users => {
    if (users) {
      currentUser = users.username
      currentAcno = acno
      //token generation
      token = jwt.sign({
        //store acno insie the token
        currentAcno: acno

      }, 'secretkey123')

      return {
        status: true,
        message: "Login successfully",
        StatusCode: 200,
        currentUser,
        currentAcno,
        token
      }
    }
     else 
     {
      return {
        status: false,
        message: "Invalid Account number or Password!!",
        StatusCode: 401
      }
    }
  })
}

//deposit
const deposit = (req, acno, password, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({
    acno, password

  }).then(user => {
    if (user) {
      if (acno != req.currentAcno) {
        return {
          status: false,
          message: "Permission Denied!!",
          StatusCode: 401
        }
      }
      user.balance += amount;
      user.transaction.push({
        type: "CREDIT",
        amount: amount
      })
      user.save()
      return {
        status: true,
        message: amount + " deposited successfully..New balance is " + user.balance,
        StatusCode: 200
      }

    } else {
      return {
        status: false,
        message: "Invalid Account number or Password!!",
        StatusCode: 401
      }

    }

  })
}


//withdraw

const withdraw = (req, acno, password, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({
    acno, password

  }).then(user => {
    if (user) {
      if (acno != req.currentAcno) {
        return {
          status: false,
          message: "Permission Denied!!",
          StatusCode: 401
        }
      }
      if (user.balance > amount) {
        user.balance -= amount;
        user.transaction.push({
          type: "DEBIT",
          amount: amount
        })
        user.save()
        return {
          status: true,
          message: amount + " debitted successfully..New balance is " + user.balance,
          StatusCode: 200
        }

      } else {
        return {
          status: false,
          message: "Insufficient balance!!",
          StatusCode: 401
        }

      }
    } else {
      return {
        status: false,
        message: "Incorrect Password",
        StatusCode: 401
      }
    }

  })
}

//transaction
const getTransactions = (acno) => {
  return db.User.findOne({
    acno
  }).then(user => {
    if (user) {
      return {
        status: true,
        StatusCode: 200,
        transaction: user.transaction
      }

    } else {
      return {
        status: false,
        message: "User does not exist!!",
        StatusCode: 401
      }
    }
  })
}

const deleteAcc = (acno) => {
  return db.User.deleteOne({
    acno

  }).then(user => {
    if (!user) {
      return {
        status: false,
        message: "Operation Failed!!",
        StatusCode: 401
      }
    }
    return {
      status: true,
      message: "Successfully Deleted!!",
      StatusCode: 200
    }
  })
}

//FOR EXPORT
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransactions,
  deleteAcc
}




