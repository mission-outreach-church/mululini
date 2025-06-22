const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Service',
    tableName: 'services',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        description: {
            type: 'text',
            nullable: true,
        },
        schedule: {
            type: 'varchar',
            nullable: true,
        },
    },
});
