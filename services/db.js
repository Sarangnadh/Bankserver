//db connection

//import mongoose
const mongoose = require('mongoose')

//connection string
mongoose.connect('mongodb://localhost:27017/BankApp',{
    useNewUrlParser:true
})
const User = mongoose.model('User',{
     userid: Number,
     username:String, 
     password:String,
     balance:Number,
     transaction:[]
})

module.exports={
    User
}






















// db connection

//import mongoose

// const mongoose = require('mongoose')


// //connection string

// mongoose.connect('mongodb://localhost:27017/BankApp',{
//     useNewUrlParser:true
// })


// //model definition

// const User = mongoose.model('User',{
//     acno: Number,
//     username: String, 
//     password: String, 
//     balance: Number,
//     transaction: []
// })



// module.exports={
//     User
// }