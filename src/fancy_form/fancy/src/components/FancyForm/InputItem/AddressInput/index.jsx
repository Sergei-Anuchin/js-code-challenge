import React, { useEffect } from 'react';
import validate from 'bitcoin-address-validation';
import { Form } from 'react-bootstrap';

const placeholder = '16q4PinynazaMYfv24juNLkbjkDQxJo2dc';

const validateSymbols = value => /^[1-9A-HJ-NP-Za-km-z]*$/.test(value);
const validateAggregateResult = value => {
  const isValid = validate(value);
  let text = '';
  if (!isValid) {
    text = value ? 'Wrong address' : 'Address required';
  }
  return { isValid, text };
};

export const AddressInput = React.memo(({ text, changeText, changeErrorState, changeShowErrorState }) => {
  const onKeyPressHandler = e => {
    const keyCode = e.which;
    const key = String.fromCharCode(keyCode);
    if (!validateSymbols(key)) {
      e.preventDefault();
    }
  };
  const onChangeHandler = (e) => {
    const { value } = e.target;

    const acceptSymbols = validateSymbols(value);
    if (acceptSymbols) {
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
      onKeyPress={onKeyPressHandler}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
    />
  );
});
