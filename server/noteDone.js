const mongoose = require("mongoose");

//连接用户数据库
// mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('连接数据库成功!'))
//     .catch(err => console.log(err, '连接数据库失败!'))

//创建用户数据表
const noteDoneSchema = new mongoose.Schema({
    username: { type: String },
    noteID: { type: Number },
    noteContent: { type: String }
});

module.exports = mongoose.model('NoteDone', noteDoneSchema);