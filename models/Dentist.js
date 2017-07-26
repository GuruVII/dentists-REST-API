var db=require('../dbconnection');

var Dentist={

getDentists:function(callback){

return db.query("SELECT * FROM seznam",callback);

},
getDentistById:function(id,callback){
	console.log(id.toString());
    return db.query("SELECT * FROM seznam WHERE id=?",[id],callback);
},
getDentistsSorted:function(oe, offset, maxAvg,type,sortColumn, orderBy, callback){
	// when adding new parameters to the query, don't forget to add them in the .js in the routes folder
	let selectedOE = oe.split("+");
	let dentistType = type.split("+");
	let limit = 100;
	let sortColumnSecured = "";
	let orderBySecured = "ASC";
	let offsetInt = parseInt(offset);
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
			return db.query(`SELECT * FROM seznam WHERE doseganje_povprecja <= ? AND ZZZS_dejavnost IN (?) ORDER BY ${sortColumnSecured} ${orderBySecured} LIMIT  ${offsetInt}, 100`,[maxAvg, dentistType],callback);
		}
		
	return db.query(`SELECT * FROM seznam WHERE sifra_oe in (?) AND doseganje_povprecja <= ? AND ZZZS_dejavnost IN (?) ORDER BY ${sortColumnSecured} ${orderBySecured} LIMIT ${offsetInt}, 100`,[selectedOE, maxAvg, dentistType], callback);
}
};
module.exports=Dentist;