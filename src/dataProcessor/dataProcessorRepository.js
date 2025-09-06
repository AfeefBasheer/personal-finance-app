import rawDataModel from "./rawDataModel.js";

async function createNewRawData(rawData) {
  try {
    return (await rawDataModel.create(rawData))._id;
  } catch (err) {
    console.log(err + " - createNewRawData() function dataProcessorRepository.js");
  }
}

export default {
  createNewRawData,
};
