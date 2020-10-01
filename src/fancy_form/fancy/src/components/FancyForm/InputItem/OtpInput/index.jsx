import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

const placeholder = 'SMS OTP';
const otpLength = 4;

const validateSymbol = symbol => {
  return /^\d$/.test(symbol);
};
const validateImmediateResult = value => {
  const acceptSymbols = /^\d*$/.test(value);
  const acceptLength = value.length <= otpLength;
  return acceptSymbols && acceptLength;
};
const validateAggregateResult = value => {
  let errorText = '';
  if (!value) {
    errorText = 'SMS OTP required';
  } else if (value.length !== otpLength) {
    errorText = `The OTP should be ${otpLength} symbols long`;
  }

  const isValid = !errorText;
  return { isValid, text: errorText };
};

export const OtpInput = React.memo(({ text, changeText, changeErrorState, changeShowErrorState }) => {
  const onKeyPressHandler = e => {
    const keyCode = e.which;
    const key = String.fromCharCode(keyCode);
    if (!validateSymbol(key)) {
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
  const onBlurHandler = () => {
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