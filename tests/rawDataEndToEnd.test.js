import rawDataService from "../src/data/service/rawDataService.js";
import dataService from "../src/data/service/dataService.js";
import quantitativeDecisionService from "../src/decisionEngine/service/quantitativeDecisionService.js";
import reportService from "../src/report/service/reportService.js";
import testData from "./testData.js";
import database from "../src/database/database.js";
import mongoose from "mongoose";

import RawData from "../src/data/model/rawDataModel.js";
import Data from "../src/data/model/dataModel.js";
import QuantitativeDecision from "../src/decisionEngine/model/quantitativeDecisionModel.js";
import Report from "../src/report/model/reportModel.js";

import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll } from "@jest/globals";

jest.setTimeout(20000);

const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

const validateStoredObject = (storedObj, expectedObj) => {
  for (const key of Object.keys(expectedObj)) {
    expect(storedObj).toHaveProperty(key, expectedObj[key]);
  }
  expect(storedObj).toHaveProperty("_id");
  expect(isValidObjectId(storedObj._id.toString())).toBe(true);
  expect(storedObj).toHaveProperty("createdAt");
  expect(new Date(storedObj.createdAt).toString()).not.toBe("Invalid Date");
  expect(storedObj).toHaveProperty("updatedAt");
  expect(new Date(storedObj.updatedAt).toString()).not.toBe("Invalid Date");
};

beforeAll(async () => {
  await database();
});

// Cleanup DB before and after each test
beforeEach(async () => {
  await RawData.deleteMany({});
  await Data.deleteMany({});
  await QuantitativeDecision.deleteMany({});
  await Report.deleteMany({});
});

afterEach(async () => {
  await RawData.deleteMany({});
  await Data.deleteMany({});
  await QuantitativeDecision.deleteMany({});
  await Report.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("addRawData", () => {

  test("validTests", async () => {
    for (const [
      rawData,
      validRawData,
      validData,
      validQuantitativeDecision,
      validReport,
    ] of testData.validData) {

      await rawDataService.addRawData(rawData);

      const storedRawData = await rawDataService.getRawDataByCompanyId(rawData.companyID);
      const storedData = await dataService.getDataByCompanyId(rawData.companyID);
      const storedQuantitativeDecision =
        await quantitativeDecisionService.getQuantitativeDecisionByCompanyId(rawData.companyID);
      const storedReport = await reportService.getReportByCompanyId(rawData.companyID);

      validateStoredObject(storedRawData, validRawData);
      validateStoredObject(storedData, validData);
      validateStoredObject(storedQuantitativeDecision, validQuantitativeDecision);
      validateStoredObject(storedReport, validReport);
    }
  });

  test("invalidTests", async () => {
    for (const [item] of testData.inValidData) {
      const rawData = item;

      const result = await rawDataService.addRawData(rawData);
      expect(result).toBeUndefined();

      if (rawData.companyID) {
        const storedRawData = await rawDataService.getRawDataByCompanyId(rawData.companyID);
        expect(storedRawData).toBeNull();
      }
    }
  });

});
