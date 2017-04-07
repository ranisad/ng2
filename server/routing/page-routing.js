const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__base + config.urls.home);
})

router.all('*', (req, res, next) => {
    if (req.url.includes("/api/") || req.url.includes(".js") || req.url.includes(".css"))
        next();
    else
        res.sendFile(__base + config.urls.home);
});

module.exports = router;