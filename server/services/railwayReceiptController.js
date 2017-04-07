var express = require('express');
var router = express.Router();
const railwayReceiptBL = require(__base + '/server/bl/railwayReceipt');
const rrBL = new railwayReceiptBL();

router.get('/get-rr-list', (req, res) => {
    rrBL.getRRList().then((result) => {
        res.status(200).json({ success: true, result: result })
    }).catch((err) => {
        res.status(500).json({ success: false, error: err.message });
    })
})

module.exports = router;