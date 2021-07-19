const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({username: 'Changyu'});
});

router.get('/group', (req, res) => {
    res.json({username: 'Changyu, group'});
});

module.exports = router;