// qpp.js 入门模块
// 职责：
//     创建服务
//     做一些服务相关配置
//     挂载路由
//     监听端口启动服务

var fs=require('fs')
//独立写法
// module.exports=function(app){
//     app.get('/',function (req,res) {
//         fs.readFile('./db.json','utf8',function (err,data) {
//             if (err){
//                 return res.status(500).send('Server error.')
//             }
//             // console.log(data)
//             res.render('index.html',{
//                 fruits:[
//                     '苹果',
//                     '香蕉',
//                     '橘子'
//                 ],
//                 students:JSON.parse(data).students
//             })
//
//         })
//
//     })
// }

//更好地写法
var Student=require('./comment')


var express=require('express')
var router=express.Router()
router.get('/',function (req,res) {
    // fs.readFile('./db.json','utf8',function (err,data) {
    //     if (err){
    //         return res.status(500).send('Server error.')
    //     }
    //     // console.log(data)
    //     res.render('index.html',{
    //         fruits:[
    //             '苹果',
    //             '香蕉',
    //             '橘子'
    //         ],
    //         students:JSON.parse(data).students
    //     })
    //
    // })
    Student.find(function (err,students) {
        if(err){
            return res.status(500).send('Server,err')
        }
        res.render('index.html',{
            fruits:[
                '柯南',
                'VS',
                '灰原哀'
            ],
            students:students
        })
    })
})

// router.get('/students',function (req,res) {
//
// })
router.get('/comment/new',function (req,res) {
    res.render('new.html')
})
router.post('/comment/new',function (req,res) {
    // console.log(req.body)//拿到数据
    Student.save(req.body,function (err) {
        if (err){
            return res.status(500).send('Server error')
        }
        res.redirect('/')
    })
})
router.get('/comment/edit',function (req,res) {
    Student.findById(parseInt(req.query.id),function (err,student) {
        if (err){
            return res.status(500).send('Server error!')
        }
        res.render('edit.html',{
            student:student
        })
    })
})
router.post('/comment/edit',function (req,res) {
    Student.updateById(req.body,function (err) {
        if (err){
            return res.status(500).send('Server error!')
        }
        res.redirect('/')
    })
})
router.get('/comment/delete',function (req,res) {
    // console.log(req.query.id)
    Student.deleteById(req.query.id,function (err) {
        if(err){
            return res.status(500).send('Server error!')
        }
        res.redirect('/')
    })
})
module.exports=router