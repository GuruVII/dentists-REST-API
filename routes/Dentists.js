const express = require('express');

const router = express.Router();
const Dentist = require('../models/Dentist');

router.get('/', function (req, res, next) {
    Dentist.getDentists(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/dentists/API/V1/:OE&offset=:offset&maxAvg=:maxAvg&type=:type&:sortColumn=:orderBy', function (req, res, next) {
    Dentist.getDentistsSorted(req.params.OE, req.params.offset, req.params.maxAvg, req.params.type, req.params.sortColumn, req.params.orderBy, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(JSON.stringify(rows));
        }
    });
});

router.get('/byID/:id', function (req, res, next) {
    if (req.params.id) {

        Dentist.getDentistById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

module.exports=router;