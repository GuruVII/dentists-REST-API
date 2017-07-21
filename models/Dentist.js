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
	// when adding new parameters to the query, don't forget to add them in the .js in the routes folder
	let selectedOE = oe.split("+");
	let offsetStart = offset-100;
	let sortColumnSecured = "";
	let orderBySecured = "ASC";
	// security meassures to ensure no one puts anythign funny in the URL
	switch (sortColumn){
		case "id":
			sortColumnSecured = "id";
			break;
		case "doseganje_povprecja":
			sortColumnSecured = "doseganje_povprecja";
			break;
		case "naslov_izvajalca_drugi_del":
			sortColumnSecured = "naslov_izvajalca_drugi_del"
			break;
		case "priimek_in_ime_zdravnika":
			sortColumnSecured = "priimek_in_ime_zdravnika"
			break;
	}
	if (orderBy == "DESC"){
		orderBySecured = "DESC"
	}

	if (selectedOE == "all")
		{
			return db.query(`SELECT * FROM seznam WHERE id <= ? AND id >= ? AND doseganje_povprecja <= ? ORDER BY ${sortColumnSecured} ${orderBySecured}`,[offset, offsetStart, maxAvg],callback);
		}
	console.log()
	return db.query(`SELECT * FROM seznam WHERE sifra_oe in (?) AND id <= ? and id >= ? AND doseganje_povprecja <= ? ORDER BY ${sortColumnSecured} ${orderBySecured}`,[selectedOE, offset, offsetStart, maxAvg], callback);
}
};
module.exports=Dentist;