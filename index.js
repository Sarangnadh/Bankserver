const express = require('express')
const jwt = require('jsonwebtoken')


//import cors
const cors = require('cors')


//.............import services
const dataservice = require('./services/data.services')

//server app create using express
const app = express()

//cors use in server app
app.use(cors({
    origin:'http://localhost:4200'
}))

//parse JSON data
app.use(express.json())



//application specific middlware
const appMiddleware = (req,res,next)=>{
next()

}
//use middleware in app
app.use(appMiddleware)

//bank server
const jwtMiddleware = (req,res,next)=>{
    //fetch token
    try{

        token = req.headers['x-access-token']
        //verify token
       const data = jwt.verify(token,'secretkey123')
       req.currentAcno = data.currentAcno
       next()
    }
    catch{
        res.status(401).json({
            status:false,
            StatusCode:401,
            message:'Please Login'
        })
    }
   
}
//registar API
app.post('/register',(req,res) =>{
    //solving asynch
     dataservice.register(req.body.username,req.body.acno,req.body.password)
    .then(result => {
    res.status(result.StatusCode).json(result)
    })

})

//login API
app.post('/login',(req,res) =>{
    dataservice.login(req.body.acno,req.body.pswd)
    .then(result => {
    res.status(result.StatusCode).json(result)
})

})



//deposit API
app.post('/deposit',jwtMiddleware,(req,res) =>{
    dataservice.deposit(req,req.body.acno,req.body.password,req.body.amt)
    .then(result => {
    res.status(result.StatusCode).json(result)

})
})

//withdraw
app.post('/withdraw',jwtMiddleware,(req,res) =>{
    dataservice.withdraw(req,req.body.acno,req.body.password,req.body.amt)
    .then(result => {
    res.status(result.StatusCode).json(result)
})

})


//transactions
app.post('/transaction',jwtMiddleware,(req,res) =>{
    dataservice.getTransactions(req.body.acno)
    .then(result => {
    res.status(result.StatusCode).json(result)

})
})
//deleteacc API
app.delete('/deleteAcc/:acno',jwtMiddleware,(req,res) =>{
    dataservice.deleteAcc(req.params.acno)
    .then(result => {
    res.status(result.StatusCode).json(result)

})
})

//USER REQUEST RESOLVING

//get req to fetch data
app.get('/' ,(req,res) =>{
    res.send("GET request")
})

//get req to create data

app.post('/' ,(req,res) =>{
    res.send("POST request")
})


//to create data
app.post('/',(req,res) =>{
    res.send("post request")
    })

//to modify entire data
 app.put('/',(req,res) =>{
        res.send("put request")
        })

//to modify partially
 app.patch('/',(req,res) =>{
            res.send("patch request")
            })

//to delete data
app.delete('/',(req,res) =>{
    res.send("delete request")
    })

app.listen(3000, () =>{
    console.log("server started..at 3000");
})







































// // server creation

// // import Express
// const express = require('express')
// //import jsontoken
// const jwt = require('jsonwebtoken')
// //import  cors
// const cors = require('cors')
// const dataservice = require('./services/data.services')
// //server app create using express
// const app = express()

// //cors use in server app
// app.use(cors({
//     origin:'http://localhost:4200'
// }))

// //parse json data
// app.use(express.json())

// //application specific middleWare
// const appMiddleware = (req, res, next) => {
//     console.log("Application specific middleware");
//     next()
// }

// //use middleware in app
// app.use(appMiddleware)




// //Bankserver
// const jwtMiddleware = (req, res, next) => {
//     //fetch token
//     try {
//         token = req.headers['abcd-token']
//         // token =req.body.token
//         //verify token
//         const data = jwt.verify(token, 'supersecretkey987654')
//         console.log(data);
//         next()
//     }
//     catch {
//         res.status(401).json({
//             status: false,
//             statusCode: 401,
//             message: 'Please Login'
//         })
//     }
// }
// app.get('/',(req,res) =>{
// res.send("Get request")
// })
// //register API
// app.post('/register', (req, res) => {
//     //register solving

//     //register solving asynchronous
//     dataservice.register(req.body.username, req.body.acno, req.body.password)
//         .then(result => {
//             res.status(result.statusCode).json(result)
//         })
// })



// // login api

// app.post('/login', (req, res) => {

//     //login solving

//     const result = dataservice.login(req.body.acno, req.body.pswd)
//     res.status(result.statusCode).json(result)
// })

// //deposit api

// app.post('/deposit', jwtMiddleware, (req, res) => {

//     //deposit solving

//     const result = dataservice.Deposit(req.body.acno, req.body.password, req.body.amt)
//     res.status(result.statusCode).json(result)
// })


// //withdrawal api

// app.post('/withdrawal', jwtMiddleware, (req, res) => {

//     //withdrawal solving

//     const result = dataservice.withdrawal(req.body.acno, req.body.password, req.body.amt)
//     res.status(result.statusCode).json(result)
// })



// //     //get transaction api

// app.post('/transaction', jwtMiddleware, (req, res) => {

//     //get transaction solving

//     const result = dataservice.getTransaction(req.body.acno)
//     res.status(result.statusCode).json(result)
// })




// //user request resolving

// //GET REQUEST -to fetch data
// app.get('/', (req, res) => {
//     res.send("GET Request")
// })

// //POST REQUEST -to create data
// app.post('/', (req, res) => {
//     res.send("POST Request")
// })

// //PUT REQUEST -to modify entire data
// app.put('/', (req, res) => {
//     res.send("PUT Request")
// })

// //PATCH REQUEST -to modify partially
// app.patch('/', (req, res) => {
//     res.send("PATCH Request")
// })

// //DELETE REQUEST -to delete data
// app.delete('/', (req, res) => {
//     res.send("DELETE Request")
// })

// //set up port number to the app
// app.listen(3000, () => {
//     console.log("server started at 3000");
// })







