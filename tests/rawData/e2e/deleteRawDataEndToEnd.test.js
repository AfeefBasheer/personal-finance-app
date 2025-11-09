import testData from "../testData/deleteRawDataTestData.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import RawData from "../../../src/data/model/rawDataModel.js";
import { describe, test, beforeAll, afterEach, afterAll } from "@jest/globals";
import supertest from "supertest";
import app from "../../../app.js";

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
describe("DELETE /rawdata/", () => {
  test("getRawData successful with valid data", async () => {
    for (const testSet of testData.validData.testCases) {
      const { addData, expectedGetData } = testSet;

      for (const rawData of addData) {
        await supertest(app)
          .post("/rawdata")
          .send(rawData)
          .set("Accept", "application/json")
          .expect(201);
      }

      await supertest(app)
        .delete(`/rawdata`)
        .set("Accept", "application/json")
        .expect(204);

      const storedRawData = await supertest(app)
        .get("/rawdata")
        .set("Accept", "application/json")
        .expect(201);

      expect(storedRawData.body).toEqual([]);
    }
  });
});
