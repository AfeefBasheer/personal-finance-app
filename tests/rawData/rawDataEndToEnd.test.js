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
import supertest from "supertest";
import app from "../../app.js";

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
describe("POST/addRawData", () => {
  test("addRawData_Successful_with_valid_Data", async () => {
    for (const item of testData.validData) {
      const {
        rawData,
        expectedRawData,
        expectedProcessedData,
        expectedQuantitativeDecision,
        expectedReport,
      } = item;

      await supertest(app)
        .post("/rawdata")
        .send(rawData)
        .set("Accept", "application/json");

      const storedRawDataResponse = await supertest(app)
        .get(`/rawdata/${rawData.companyID}`)
        .set("Accept", "application/json");
      const storedRawData = storedRawDataResponse.body;

      const storedDataResponse = await supertest(app)
        .get(`/data/${rawData.companyID}`)
        .set("Accept", "application/json");
      const storedData = storedDataResponse.body;

      const storedQuantitativeDecisionResponse = await supertest(app)
        .get(`/quantitativedecision/${rawData.companyID}`)
        .set("Accept", "application/json");
      const storedQuantitativeDecision =
        storedQuantitativeDecisionResponse.body;

      const storedReportResponse = await supertest(app)
        .get(`/report/${rawData.companyID}`)
        .set("Accept", "application/json");
      const storedReport = storedReportResponse.body;

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
    test("addRawData_failed " + item.testCaseName, async () => {
      const rawData = item;
      const storedResponse = await supertest(app)
        .post("/rawdata")
        .send(rawData);
      const storedResult = storedResponse.body;

      expect(storedResult).toHaveProperty("error");
    });
  }
});
