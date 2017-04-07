const express = require('express');
const router = express.Router();

router.use('/rr', require(__base + '/server/services/railwayReceiptController'));

module.exports = router;