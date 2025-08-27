import rawDataModel from './rawDataModel.js'

async function createNewRawData(rawData){
    return await rawDataModel.create(rawData)
}

export default {
    createNewRawData,
}