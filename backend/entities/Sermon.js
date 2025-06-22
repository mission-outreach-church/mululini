const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Sermon',
    tableName: 'sermons',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        title: {
            type: 'varchar',
        },
        preacher: {
            type: 'varchar',
        },
        date: {
            type: 'date',
        },
        description: {
            type: 'text',
            nullable: true,
        },
        audioUrl: {
            type: 'varchar',
            nullable: true,
        },
    },
});
