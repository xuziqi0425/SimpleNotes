var express=require('express')
// var fs=require('fs')
var router=require('./router')
var bodyParser=require('body-parser')
var app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
app.engine('html',require('express-art-template'))
// router(app) //独立写法
app.use(router)
// app.get('/',function (req,res) {
//     fs.readFile('./db.json','utf8',function (err,data) {
//         if (err){
//             return res.status(500).send('Server error.')
//         }
//         // console.log(data)
//         res.render('index.html',{
//             fruits:[
//                 '苹果',
//                 '香蕉',
//                 '橘子'
//             ],
//             students:JSON.parse(data).students
//         })
//
//     })
//
// })
app.listen(3000,function () {
    console.log('已运行,http://localhost:3000/')
})


