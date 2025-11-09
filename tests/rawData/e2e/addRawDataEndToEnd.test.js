import testData from "../testData/addRawDataTestData.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import RawData from "../../../src/data/model/rawDataModel.js";
import Data from "../../../src/data/model/dataModel.js";
import QuantitativeDecision from "../../../src/decisionEngine/model/quantitativeDecisionModel.js";
import Report from "../../../src/report/model/reportModel.js";
import {
  describe,
  test,
  expect,
  beforeAll,
  afterEach,
  afterAll,
} from "@jest/globals";
import supertest from "supertest";
import app from "../../../app.js";
import testValidation from "../utils/testValidation.js";

let mongoServer;

//connecting to in-memory-mongodb-connection
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

//cleaning DB after each test
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
describe("POST/rawData", () => {
  test("addRawData successful with valid data", async () => {
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

      testValidation.validateObjects(storedRawData, expectedRawData);
      testValidation.validateObjects(storedData, expectedProcessedData);
      testValidation.validateObjects(
        storedQuantitativeDecision,
        expectedQuantitativeDecision
      );
      testValidation.validateObjects(storedReport, expectedReport);
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
