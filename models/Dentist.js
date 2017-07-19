var db=require('../dbconnection');

var Dentist={

getDentists:function(callback){

return db.query("SELECT * FROM seznam",callback);

},
getDentistById:function(id,callback){
	console.log(id.toString());
    return db.query("SELECT * FROM seznam WHERE id=?",[id],callback);
},
getDentistsSorted:function(oe, callback){
	let selectedOE = oe.split("&");
	let test213 = "SELECT * FROM seznam WHERE sifraOE IN (?) ORDER BY id ASC"
	return db.query(test213 ,[selectedOE],callback);
}
};
module.exports=Dentist;