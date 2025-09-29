// rawDataService.test.js
import rawDataService from "../../src/data/service/rawDataService.js";
import rawDataRepository from "../../src/data/repository/rawDataRepository.js";
import dataService from "../../src/data/service/dataService.js";
import testData from "./testData.js";
import {jest,it,expect} from "jest"

jest.mock("../../src/data/repository/rawDataRepository.js", () => ({
  __esModule: true,
  default: { createNewRawData: jest.fn() },
}));

jest.mock("../../src/data/service/dataService.js", () => ({
  __esModule: true,
  default: { processRawData: jest.fn(), addData: jest.fn() },
}));

describe("rawDataService.addRawData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -------------------
  // Valid Data Tests
  describe("valid data", () => {
    testData.validData.forEach((testCase, index) => {
      it(`should add valid rawData ${index}`, async () => {
        const rawInput = testCase[0];

        rawDataRepository.createNewRawData.mockResolvedValue({
          ...rawInput,
          _id: "hdhfjkehfkdjfjksdhflhfjkdhfkjdhfjdjkhfkl",
        });

        dataService.processRawData.mockReturnValue(testCase[2]);
        dataService.addData.mockResolvedValue(undefined);

        const result = await rawDataService.addRawData(rawInput);

        expect(result).toEqual(expect.objectContaining(rawInput));
        expect(result._id).toEqual(expect.any(String));

        expect(dataService.processRawData).toHaveBeenCalledWith(
          expect.objectContaining(result)
        );
        expect(dataService.addData).toHaveBeenCalledWith(
          expect.objectContaining(rawInput),
          expect.objectContaining(testCase[2])
        );
      });
    });
  });
});
