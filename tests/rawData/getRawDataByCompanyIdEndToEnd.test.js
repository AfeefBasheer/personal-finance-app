import testData from "./getRawDataByCompanyIdTestData.js";
import mongoose from "mongoose";
import testValidation from "./testValidation.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import rawDataModel from "../../src/data/model/rawDataModel.js";
import { describe, test, beforeAll, afterEach, afterAll } from "@jest/globals";
import supertest from "supertest";
import app from "../../app.js";

let mongoServer;

//connecting to in-memory-mongodb-connection
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

//cleaning DB after each test
afterEach(async () => {
  await rawDataModel.deleteMany({});
});

//disconnecting from in-memory-mongodb-connection
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// validTests
describe("GET /rawData /:companyId", () => {
  test("getRawDataByCompanyId successful with valid data", async () => {
    for (const rawData of testData.validData.rawData) {
      await supertest(app)
        .post("/rawdata")
        .send(rawData)
        .set("Accept", "application/json");
    }

    const expectedData = testData.validData.expectedData;
    let i = 0;
    for (const rawData of testData.validData.rawData) {
      const retreivedRawDataResponse = await supertest(app)
        .get(`/rawdata/${rawData.companyID}`)
        .set("Accept", "application/json");
      const retreivedRawData = retreivedRawDataResponse.body;
      testValidation.validateObjects(retreivedRawData, expectedData[i]);
      i++;
    }
  });

  for (const inValid of testData.inValidData) {
    test(inValid.testCaseName, async () => {
      for (const rawData of inValid.rawData) {
        await supertest(app)
          .post("/rawdata")
          .send(rawData)
          .set("Accept", "application/json");
      }

      let i = 0;
      for (const rawData of inValid.rawData) {
        const res = await supertest(app)
          .get(`/rawdata/${rawData.companyID}`)
          .set("Accept", "application/json");

        const retrieved = res.body;
        testValidation.validateObjects(retrieved, inValid.expectedData[i]);
        i++;
      }
    });
  }
});
