const express = require('express');
const { AppDataSource } = require('../config/app.db');

const router = express.Router();
const Sermon = require('../entities/Sermon');

// Get all sermons
router.get('/', async (req, res) => {
    const repo = AppDataSource.getRepository('Sermon');
    const sermons = await repo.find();
    res.json(sermons);
});

// Get sermon by id
router.get('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Sermon');
    const sermon = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!sermon) return res.status(404).json({ message: 'Not found' });
    res.json(sermon);
});

// Create sermon
router.post('/', async (req, res) => {
    const repo = AppDataSource.getRepository('Sermon');
    const sermon = repo.create(req.body);
    await repo.save(sermon);
    res.status(201).json(sermon);
});

// Update sermon
router.put('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Sermon');
    let sermon = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!sermon) return res.status(404).json({ message: 'Not found' });
    repo.merge(sermon, req.body);
    await repo.save(sermon);
    res.json(sermon);
});

// Delete sermon
router.delete('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Sermon');
    const result = await repo.delete({ id: parseInt(req.params.id) });
    if (result.affected === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
});

module.exports = router;
