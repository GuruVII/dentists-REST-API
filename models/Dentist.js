var db=require('../dbconnection');

var Dentist={

getDentists:function(callback){

return db.query("SELECT * FROM seznam",callback);

},
getDentistById:function(id,callback){
	console.log(id.toString());
    return db.query("SELECT * FROM seznam WHERE id=?",[id],callback);
},
getDentistsSorted:function(oe, offset, maxAvg,sortColumn, orderBy, callback){
	let selectedOE = oe.split("+");
	// when adding new parameters to the query, don't forget to add them in the .js in the routes folder
	if (selectedOE == "all")
		{
			let searcParameters = `SELECT * FROM seznam WHERE id <= ${offset} AND id >= ${offset-100} AND doseganje_povprecja <= ${maxAvg} ORDER BY ${sortColumn} ${orderBy}`
			return db.query(searcParameters,callback);
		}
	let searcParameters = `SELECT * FROM seznam WHERE sifra_oe in (${selectedOE}) AND id <= ${offset} and id >= ${offset-100} ORDER BY ${sortColumn} ${orderBy}`
	console.log()
	return db.query(`SELECT * FROM seznam WHERE sifra_oe in (${selectedOE}) AND id <= ${offset} and id >= ${offset-100} AND doseganje_povprecja <= ${maxAvg} ORDER BY ${sortColumn} ${orderBy}`, callback);
}
};
module.exports=Dentist;