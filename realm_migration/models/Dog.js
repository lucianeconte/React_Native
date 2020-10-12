const schema = {
    name: 'Dog',
    properties: {
        name: {type: 'string'},
    },
};

export class Dog {
    name = '';
}
Dog.schema = schema;