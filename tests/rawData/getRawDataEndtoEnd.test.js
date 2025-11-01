import testData from "./getRawDataTestData.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import RawData from "../../src/data/model/rawDataModel.js";
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

const validateRetrievedObject = (retrievedObject, expectedObject) => {
  for (const key of Object.keys(expectedObject)) {
    expect(retrievedObject).toHaveProperty(key);
  }
  expect(retrievedObject).toHaveProperty("_id");
  expect(isValidObjectId(retrievedObject._id.toString())).toBe(true);
  expect(retrievedObject).toHaveProperty("createdAt");
  expect(new Date(retrievedObject.createdAt).toString()).not.toBe(
    "Invalid Date"
  );
  expect(retrievedObject).toHaveProperty("updatedAt");
  expect(new Date(retrievedObject.updatedAt).toString()).not.toBe(
    "Invalid Date"
  );
};

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
});

//disconnecting from in-memory-mongodb-connection
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// validTests
describe("POST /rawData", () => {
  test("getRawData successful with valid data", async () => {
    for (const testSet of testData.validData.testCases) {
      const { addData, expectedGetData } = testSet;

      for (const rawData of addData) {
        await supertest(app)
          .post("/rawdata")
          .send(rawData)
          .set("Accept", "application/json");
      }

      const retrievedRawDataResponse = await supertest(app)
        .get(`/rawdata`)
        .set("Accept", "application/json")
        .expect(201);
      const retrievedData = retrievedRawDataResponse.body;

      for (let i = 0; i < addData.length; i++)
        validateRetrievedObject(retrievedData[i], expectedGetData[i]);
    }
  });
});
