var fs=require('fs')
var dbPath='./db.json'
exports.find=function (callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}
//根据id获取学生对象
exports.findById=function(id,callback){
    fs.readFile(dbPath,'utf8',function (err,data) {
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students;
        var ret=students.find(function (item) {
            return item.id===parseInt(id);
        })
        callback(null,ret)
    })
}
exports.save=function (student,callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        var students=JSON.parse(data).students;
        //处理id不重复
        student.id=students[students.length-1].id+1;
        students.push(student)
        var fileData=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function (err) {
            if (err){
                return callback(err)
            }
            //成功就是没错 错误对象为null
            callback(null)
        })
    })
}
exports.updateById=function (student,callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        var students=JSON.parse(data).students;
        student.id=parseInt(student.id)//把id从字符串改为数字
        var stu= students.find(function (item) {
            return item.id===student.id
        })
        for(var key in student){
            stu[key]=student[key]
        }
        var fileData=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function (err) {
            if (err){
                return callback(err)
            }
            //成功就是没错 错误对象为null
            callback(null)
        })
    })
}
exports.deleteById=function (id,callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students;
        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })
        //根据下标从数组中删除对象
        students.splice(deleteId, 1)
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            //成功就是没错 错误对象为null
            callback(null)
        })
    })
}