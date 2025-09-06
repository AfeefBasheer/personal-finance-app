import rawDataModel from "./rawDataModel.js";

async function createNewRawData(rawData) {
  try {
    return (await rawDataModel.create(rawData))._id;
  } catch (err) {
    console.log(err + " - createNewRawData() | dataProcessorRepository");
  }
}

async function readAllRawData(rawData) {
  try {
    return (await rawDataModel.find())
  } catch (err) {
    console.log(err + " - findNewRawData() | dataProcessorRepository");
  }
}

export default {
  createNewRawData,
  readAllRawData,
};
