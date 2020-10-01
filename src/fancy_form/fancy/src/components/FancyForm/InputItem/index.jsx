import React, { useState, useCallback } from 'react';
import { InputItemHeader } from './InputItemHeader';
import { InputItemError } from './InputItemError';
import { Form } from 'react-bootstrap';

export const InputItem = React.memo(({ children, header, changeValidationResults, showError }) => {
  const [errorText, setErrorText] = useState('');

  const changeErrorState = useCallback(changeErrorStateObject => {
    const { isValid, text } = changeErrorStateObject;
    setErrorText(text);
    changeValidationResults(isValid);
  }, [changeValidationResults]);

  const Input = children(changeErrorState);

  return (
    <Form.Group className='form-group'>
      <InputItemHeader header={header}/>
      { Input }
      { showError && errorText && <InputItemError error={errorText}/> }
    </Form.Group>
  );
});
