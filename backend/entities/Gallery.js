const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Gallery',
    tableName: 'gallery',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        title: {
            type: 'varchar',
        },
        imageUrl: {
            type: 'varchar',
        },
        description: {
            type: 'text',
            nullable: true,
        },
        uploadedAt: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
});
