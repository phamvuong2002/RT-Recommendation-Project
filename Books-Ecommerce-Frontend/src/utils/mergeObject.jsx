export const mergeObject = (...objects) => {
   
    const deepCopyObjects = objects.map(object => JSON.parse(JSON.stringify(object)));

    return deepCopyObjects
}
