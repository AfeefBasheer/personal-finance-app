import rawDataService from "../../src/data/service/rawDataService.js";
import dataService from "../../src/data/service/dataService.js";
import quantitativeDecisionService from "../../src/decisionEngine/service/quantitativeDecisionService.js";
import reportService from "../../src/report/service/reportService.js";
import testData from "./testData.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import RawData from "../../src/data/model/rawDataModel.js";
import Data from "../../src/data/model/dataModel.js";
import QuantitativeDecision from "../../src/decisionEngine/model/quantitativeDecisionModel.js";
import Report from "../../src/report/model/reportModel.js";
import {
  describe,
  test,
  expect,
  beforeAll,
  afterEach,
  afterAll,
} from "@jest/globals";

const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

const validateStoredObject = (storedObj, expectedObj) => {
  for (const key of Object.keys(expectedObj)) {
    expect(storedObj).toHaveProperty(key);
  }
  expect(storedObj).toHaveProperty("_id");
  expect(isValidObjectId(storedObj._id.toString())).toBe(true);
  expect(storedObj).toHaveProperty("createdAt");
  expect(new Date(storedObj.createdAt).toString()).not.toBe("Invalid Date");
  expect(storedObj).toHaveProperty("updatedAt");
  expect(new Date(storedObj.updatedAt).toString()).not.toBe("Invalid Date");
};

let mongoServer;

//connecting to in-memory-mongodb-connection
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

//cleaning DB before each test
afterEach(async () => {
  await RawData.deleteMany({});
  await Data.deleteMany({});
  await QuantitativeDecision.deleteMany({});
  await Report.deleteMany({});
});

//disconnecting from in-memory-mongodb-connection
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

//validTests
describe("addRawData", () => {
  test("addRawData_Successful_with_valid_Data", async () => {
    for (const item of testData.validData) {
      const {
        rawData,
        expectedRawData,
        expectedProcessedData,
        expectedQuantitativeDecision,
        expectedReport,
      } = item;

      await rawDataService.addRawData(rawData);

      const storedRawData = await rawDataService.getRawDataByCompanyId(
        rawData.companyID
      );
      const storedData = await dataService.getDataByCompanyId(
        rawData.companyID
      );
      const storedQuantitativeDecision =
        await quantitativeDecisionService.getQuantitativeDecisionByCompanyId(
          rawData.companyID
        );
      const storedReport = await reportService.getReportByCompanyId(
        rawData.companyID
      );
      
      validateStoredObject(storedRawData, expectedRawData);
      validateStoredObject(storedData, expectedProcessedData);
      validateStoredObject(
        storedQuantitativeDecision,
        expectedQuantitativeDecision
      );
      validateStoredObject(storedReport, expectedReport);
    }
  });

//Invalid Tests
  for (const item of testData.inValidData) {
    test(item.testCaseName, async () => {
      const { rawData } = item;
      const result = await rawDataService.addRawData(rawData);

      expect(result).toBeUndefined();

      if (rawData.companyID && rawData.companyID.trim() !== "") {
        const storedRawData = await rawDataService.getRawDataByCompanyId(
          rawData.companyID
        );
        expect(storedRawData).toBeNull();
      }
    });
  }
});
