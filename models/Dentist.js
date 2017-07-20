var db=require('../dbconnection');

var Dentist={

getDentists:function(callback){

return db.query("SELECT * FROM seznam",callback);

},
getDentistById:function(id,callback){
	console.log(id.toString());
    return db.query("SELECT * FROM seznam WHERE id=?",[id],callback);
},
getDentistsSorted:function(oe, offset, callback){
	let selectedOE = oe.split("&");
	console.log(offset)
	console.log(selectedOE)
	if (selectedOE == "all")
		{
			let searcParameters = "SELECT * FROM seznam WHERE id <= ? ORDER BY id ASC"
			return db.query(searcParameters ,[offset],callback);
		}
	let searcParameters = "SELECT * FROM seznam WHERE sifraOE IN (?) AND id <= ? ORDER BY id ASC"
	return db.query(searcParameters ,[selectedOE, offset],callback);
}
};
module.exports=Dentist;