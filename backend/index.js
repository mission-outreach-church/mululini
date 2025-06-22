const { AppDataSource } = require('./config/app.db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const sermonRoutes = require('./routes/sermons');
const galleryRoutes = require('./routes/gallery');
const eventRoutes = require('./routes/events');
const serviceRoutes = require('./routes/services');

app.use('/api/sermons', sermonRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/services', serviceRoutes);

// Catch-all for unmatched routes
app.use((req, res) => {
    console.log('Unmatched request:', req.method, req.originalUrl);
    res.status(404).json({ message: 'Endpoint not found', path: req.originalUrl });
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
        app.listen(8000, () => {
            console.log('Server running on port 8000');
            setInterval(() => {
                console.log('Still running...');
            }, 10000);
        });
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
