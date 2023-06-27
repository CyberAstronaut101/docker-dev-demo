const express = require('express');
const router = express.Router();
const Cve = require('../models/cve');

// Getting all
router.get('/', async (req, res) => {
    try {
        const cves = await Cve.find();
        res.json(cves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting one
router.get('/:id', getCve, (req, res) => {
    res.json(res.cve);
});

// Creating one
router.post('/', async (req, res) => {
    const cve = new Cve({
        id: req.body.id,
        description: req.body.description,
        references: req.body.references,
        cvss_score: req.body.cvss_score
    });

    try {
        const newCve = await cve.save();
        res.status(201).json(newCve);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating one
router.patch('/:id', getCve, async (req, res) => {
    if (req.body.id != null) {
        res.cve.id = req.body.id;
    }

    if (req.body.description != null) {
        res.cve.description = req.body.description;
    }

    if (req.body.references != null) {
        res.cve.references = req.body.references;
    }

    if (req.body.cvss_score != null) {
        res.cve.cvss_score = req.body.cvss_score;
    }

    try {
        const updatedCve = await res.cve.save();
        res.json(updatedCve);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting one
router.delete('/:id', getCve, async (req, res) => {
    try {
        await res.cve.remove();
        res.json({ message: 'Deleted CVE' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getCve(req, res, next) {
    let cve;
    try {
        cve = await Cve.findById(req.params.id);
        if (cve == null) {
            return res.status(404).json({ message: 'Cannot find CVE' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.cve = cve;
    next();
}

module.exports = router;
