'use strict';
const {map, find, equals} = require('ramda');
const get = require('./get');
const create = require('./post')
const makePath = objectName => `organizations/objects/${objectName}/definitions`;
const update = require('./update');

module.exports = async (data) => {
    const objectDefinitions = data.objectDefinitions;
    let endpointObjects = [];
    try {
        endpointObjects = await get('organizations/objects/definitions');
    } catch (err) {}
    map(async objectName => {
        let endpointObjectName = find(equals(objectName))(Object.keys(endpointObjects));
        if(endpointObjectName) {
            await update(makePath(endpointObjectName), objectDefinitions[endpointObjectName]);
        } else {
            await create(makePath(objectName), objectDefinitions[objectName]);
        }
    })(Object.keys(objectDefinitions));
    return data
}

