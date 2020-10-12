export default (oldRealm, newRealm) => {
    console.log('sei la')
    // if (oldRealm.schemaVersion < 1) {
        console.log('old new realm')
        const oldObjects = oldRealm.objects('Dog');
        const newObjects = newRealm.objects('Dog');

        // loop through all objects and set the name property in the new schema
        for (let i = 0; i < oldObjects.length; i++) {
            newObjects[i].color = 'color';
        }
    // }
}