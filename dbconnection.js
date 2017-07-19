const mysql=require('mysql');
const connection=mysql.createPool({

host:'localhost',
user:'root',
password:'',
database:'zobozdravnik',
debug: ["ComQueryPacket"]


});
module.exports=connection;