import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import supertest from "supertest";
import app from "../../../app.js";
import rawDataModel from "../../../src/data/model/rawDataModel.js";
import testData from "../testData/deleteRawDataByCompanyIdTestData.js";
import {
  describe,
  test,
  beforeAll,
  afterEach,
  afterAll,
  expect,
} from "@jest/globals";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await rawDataModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("DELETE /rawdata/:companyId", () => {
  test("should delete raw data for a valid company ID", async () => {
    for (const rawData of testData.validData) {
      const postRes = await supertest(app)
        .post("/rawdata")
        .send(rawData)
        .set("Accept", "application/json")
        .expect(201);

      expect(postRes.body).toBeDefined();
      expect(postRes.body.companyID).toBe(rawData.companyID);
    }

    for (const rawData of testData.validData) {
      const getRes = await supertest(app)
        .get(`/rawdata/${rawData.companyID}`)
        .set("Accept", "application/json")
        .expect(200);

      expect(getRes.body).toBeDefined();
      expect(getRes.body).not.toBeNull();

      if (Array.isArray(getRes.body)) {
        expect(getRes.body.length).toBeGreaterThan(0);
        expect(getRes.body[0].companyID).toBe(rawData.companyID);
      } else {
        expect(getRes.body.companyID).toBe(rawData.companyID);
      }
    }

    for (const rawData of testData.validData) {
      const delRes = await supertest(app)
        .delete(`/rawdata/${rawData.companyID}`)
        .set("Accept", "application/json")
        .expect(200);

      expect(delRes.body).toBeDefined();
      expect(delRes.body.message || delRes.body.success).toBeUndefined();
    }

    for (const rawData of testData.validData) {
      const getResAfter = await supertest(app)
        .get(`/rawdata/${rawData.companyID}`)
        .set("Accept", "application/json");

      expect([200, 404]).toContain(getResAfter.status);

      if (getResAfter.status === 200) {
        const body = getResAfter.body;
        if (Array.isArray(body)) {
          expect(body.length).toBe(0);
        } else {
          expect(body).toEqual({});
        }
      }
    }
  });
});
