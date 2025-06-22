const express = require('express');
const { AppDataSource } = require('../config/app.db');

const router = express.Router();
const Gallery = require('../entities/Gallery');

// Get all gallery items
router.get('/', async (req, res) => {
    const repo = AppDataSource.getRepository('Gallery');
    const items = await repo.find();
    res.json(items);
});

// Get gallery item by id
router.get('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Gallery');
    const item = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
});

// Create gallery item
router.post('/', async (req, res) => {
    const repo = AppDataSource.getRepository('Gallery');
    const item = repo.create(req.body);
    await repo.save(item);
    res.status(201).json(item);
});

// Update gallery item
router.put('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Gallery');
    let item = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!item) return res.status(404).json({ message: 'Not found' });
    repo.merge(item, req.body);
    await repo.save(item);
    res.json(item);
});

// Delete gallery item
router.delete('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Gallery');
    const result = await repo.delete({ id: parseInt(req.params.id) });
    if (result.affected === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
});

module.exports = router;
