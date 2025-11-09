import { expect } from "@jest/globals";

const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

const validateObjects = (storedObj, expectedObj) => {
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

export default { validateObjects };
