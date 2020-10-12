import { Models } from './models/';
import Realm from 'realm';
import migrations from './migrations/';


export const migrateRealm = () => {
    // Will be -1 if the Realm at the path has never been opened before.
    let schemaVersion = Realm.schemaVersion('dogs-realm');
    console.log('aqui ' + schemaVersion)
    schemaVersion = schemaVersion !== -1 ? schemaVersion : 0;
    if (migrations.length === 0) {
        console.log('aqui')
        console.log(Models)
        return {schema: Models, path: 'dogs-realm', schemaVersion };
    }
    // 2. Get the index of the migration where we are currently at
    let nextMigrationsIndex = -1;
    for (let index = 0; index < migrations.length; index++) {
        const migration = migrations[index];
        console.log('migratiion ' + migration[index] )
        if (migration.schemaVersion === schemaVersion) {
            nextMigrationsIndex = index;
            console.log('dentro')
            break;
        }
    }
    // 3. Lets move onto the next migration, since we know that this one has already been migrated to
    nextMigrationsIndex++;
    // 4. The next migration and all others that follow are going to be executed so that we incrementally migrate the Realm
    for (; nextMigrationsIndex < migrations.length; nextMigrationsIndex++) {
        console.log('for')
        const migratedRealm: Realm = new Realm({
            ...migrations[nextMigrationsIndex],
            path: 'dogs-realm',
        });
        migratedRealm.close();
    }

    // 5. Now that we have migrated the Realm up to the most current version let's return the proper configuration
    return {
        schema: Models,
        schemaVersion: migrations[migrations.length - 1].schemaVersion,
        path: 'dogs-realm'
    };
};

