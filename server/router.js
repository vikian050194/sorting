var express = require('express'),
    router = express.Router(),
    path = require('path');

if (process.env.NODE_ENV === 'production') {
    router.route('/')
        .get(function (req, res) {
            res.sendFile(path.resolve(__dirname + '/../client/Index.html'));
        });
}

module.exports = router;