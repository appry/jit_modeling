import Validator from "validator";
import isEmpty from "./is-empty";

export const validateProduct = data => {
  let errors = {};
  if (!Validator.isDecimal(data.storagePrice)) {
    errors.storagePrice = "Number is expected";
  }
  if (!Validator.isLength(data.name, { min: 1, max: 30 })) {
    errors.name = "Name is invalid";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const validateSupplier = data => {
  let errors = {};
  if (!Validator.isLength(data.name, { min: 1, max: 30 })) {
    errors.name = "Name is invalid";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const validateSupply = data => {
  let errors = {};
  if (!Validator.isDecimal(data.price)) {
    errors.price = "Number is expected";
  }
  if (!Validator.isDecimal(data.time)) {
    errors.time = "Number is expected";
  }
  if (!Validator.isNumeric(data.max)) {
    errors.max = "Number is expected";
  }
  if (Validator.isEmpty(data.supplier)) {
    errors.supplier = "Select supplier";
  }
  if (Validator.isEmpty(data.product)) {
    errors.product = "Select product";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const validateElementProduct = data => {
  let errors = {};
  if (!Validator.isDecimal(data.amount)) {
    errors.amount = "Number is expected";
  }

  if (Validator.isEmpty(data.product)) {
    errors.product = "Select product";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
