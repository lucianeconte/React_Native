import migrationCallback from './migration';

const schemas = [];

import Dog from './Dog';
schemas.push(Dog);

console.log(Dog)

export default {
    schema: schemas,
    schemaVersion: 0,
    migration: migrationCallback,
};