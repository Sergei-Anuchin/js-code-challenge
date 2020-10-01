import React, { useEffect } from 'react';
import isFloat from 'validator/lib/isFloat';
import { Form } from 'react-bootstrap';

const placeholder = '0.0000';
const decimalPoint = '.';
const zero = '0';
const maxDigitsCountAfterDecimalPoint = 8;
const decimalPointPositionRegExp = new RegExp(`(?:\\.\\d{0,${maxDigitsCountAfterDecimalPoint}}$)`);
const decimalPointsCountRegExp = new RegExp(`\\.`, 'gm');

const validateSymbol = (key, value) => (key === decimalPoint && !value.includes(decimalPoint)) || /\d/.test(key);
const validateImmediateResult = value => {
  const acceptDecimalPointPosition = value.indexOf(decimalPoint) === -1 || decimalPointPositionRegExp.test(value);
  const decimalPointMatches = value.match(decimalPointsCountRegExp);
  const acceptDecimalPointsCount = !decimalPointMatches || decimalPointMatches.length <= 1;
  const acceptSymbols = /^[\d.]*$/.test(value);
  return acceptDecimalPointPosition && acceptDecimalPointsCount && acceptSymbols;
};
const changeAggregateResult = value => {
  let outValue = value;
  while (outValue[0] === zero && outValue.indexOf(decimalPoint) !== 1 && outValue.length !== 1) {
    outValue = outValue.substr(1);
  }
  if (outValue.includes(decimalPoint)) {
    while (outValue[outValue.length - 1] === zero) {
      outValue = outValue.substr(0, outValue.length - 1);
    }
  }
  if (outValue[outValue.length - 1] === decimalPoint) {
    outValue = outValue.substr(0, outValue.length - 1);
  }
  return outValue;
};
const validateAggregateResult = value => {
  let errorText = '';
  if (!value) {
    errorText = 'Amount required';
  } else if (!isFloat(value, { locale: 'en-US' })) {
    errorText = 'Not a float number';
  } else if (!isFloat(value, { gt: 0 })) {
    errorText = 'The number should be more then 0';
  }

  const isValid = !errorText;
  return { isValid, text: errorText };
};

export const AmountInput = React.memo(({ text, changeText, changeErrorState, changeShowErrorState }) => {
  const onKeyPressHandler = e => {
    const currValue = e.target.value;
    const keyCode = e.which;
    const key = String.fromCharCode(keyCode);

    if (!validateSymbol(key, currValue)) {
      e.preventDefault();
    }
  };
  const onChangeHandler = e => {
    const { value } = e.target;
    const accept = validateImmediateResult(value);

    if (accept) {
      changeErrorState(validateAggregateResult(value));
      changeShowErrorState(false);
      changeText(value);
    }
  };
  const onBlurHandler = e => {
    const { value } = e.target;
    const outValue = changeAggregateResult(value);

    if (value !== outValue) {
      changeText(outValue);
    }
    changeShowErrorState(true);
  };

  useEffect(() => {
    changeErrorState(validateAggregateResult(text));
  }, []);
  return (
    <Form.Control
      placeholder={placeholder}
      value={text}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      onBlur={onBlurHandler}
    />
  );
});