const express = require("express")
const Guest = require("../model/guest") //引入guest

const path = require("path")
const multer = require('multer');
const moment = require("moment")

const router = express.Router()

router.get("/message", async(req, res) => {
    let result = await Guest.find()
    console.log(result)
    res.render("message.html", { guest: result })
})

router.get("/attending", (req, res) => {
    res.render("attending.html")
})

// //访客界面 POST
// router.post("/attending", (req, res) => {
//     console.log(req.body)
//     let guest = new Guest(req.body)
//     console.log(guest)
//     guest.save()
// })

//文件上传
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, path.join(__dirname, '../public/img'));
    },
    filename: function(req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });
//文件上传字段可以分为两种：一种是表单的普通字段(req.body)，一种是表单的上传字段(req.file)
router.post("/attending", upload.single('avatar'), async(req, res) => {
    console.log(req.body)
    console.log(req.file)
    req.body.avatar = "../public/img/" + req.file.filename
    let guest1 = Guest(req.body)
    guest1.save()
})


module.exports = router;