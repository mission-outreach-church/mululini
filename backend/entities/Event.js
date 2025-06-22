const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Event',
    tableName: 'events',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        date: {
            type: 'date',
        },
        location: {
            type: 'varchar',
        },
        description: {
            type: 'text',
            nullable: true,
        },
    },
});
