var express = require('express');
var router = express.Router();
var Dentist=require('../models/Dentist');

router.get('/',function(req,res,next){
Dentist.getDentists(function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
 
    });
});

router.get('/:OE&offset=:offset&maxAvg=:maxAvg&:sortColumn=:orderBy',function(req,res,next){
Dentist.getDentistsSorted(req.params.OE, req.params.offset, req.params.maxAvg, req.params.sortColumn, req.params.orderBy, function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
 
    });



});

router.get('/byID/:id',function(req,res,next){

if(req.params.id){

    Dentist.getDentistById(req.params.id,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}
});

module.exports=router;