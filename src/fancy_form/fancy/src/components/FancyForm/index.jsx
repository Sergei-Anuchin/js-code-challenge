import React, { useState } from 'react';
import { InputItem } from './InputItem';
import { AddressInput } from "./InputItem/AddressInput";
import { AmountInput } from "./InputItem/AmountInput";
import { OtpInput } from "./InputItem/OtpInput";
import { fieldKeys } from '../../constants';
import { Button, Form } from 'react-bootstrap';
import styles from './styles.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from "classnames/bind";

export const FancyForm = React.memo(() => {
  const [validationResults, setValidationResults] = useState({ address: false, amount: false, otp: false });
  const [showError, setShowError] = useState({ address: false, amount: false, otp: false });
  const [inputTexts, setInputTexts] = useState({ address: '', amount: '', otp: '' });
  const [btcIsSent, setBtcIsSent] = useState(false);
  const accept = Object.values(validationResults).reduce((acc, x) => acc && x);

  const changeValidationResults = key => value => {
    setValidationResults({ ...validationResults, [key]: value });
  };
  const changeShowErrorState = key => value => {
    setShowError({ ...showError, [key]: value });
  };
  const changeText = key => text => {
    setInputTexts({ ...inputTexts, [key]: text });
  };

  const makeTextInputProps = (changeErrorState, key) => ({
    changeErrorState,
    changeShowErrorState: changeShowErrorState(key),
    changeText: changeText(key),
    text: inputTexts[key],
  });
  const makeInputItemProps = (header, key) => ({
    header,
    changeValidationResults: changeValidationResults(key),
    showError: showError[key],
  });

  const sendBtc = () => {
    setShowError({ address: true, amount: true, otp: true });
    setBtcIsSent(accept);
  };
  const sendAgain = () => {
    setValidationResults({ address: false, amount: false, otp: false });
    setShowError({ address: false, amount: false, otp: false });
    setInputTexts({ address: '', amount: '', otp: '' })
    setBtcIsSent(false);
  };

  if (btcIsSent) {
    return (
      <form className={classNames(styles.successForm, styles.form, 'form')}>
        <Form.Label className={styles.successMessage}>Congratulations! You've sent BTC.</Form.Label>
        <Button onClick={sendAgain}>Send BTC again</Button>
      </form>
    );
  }

  return (
    <form className={classNames(styles.form, 'form')}>
      <InputItem { ...makeInputItemProps('Bitcoin Address', fieldKeys.address) }>
        { changeErrorState => <AddressInput { ...makeTextInputProps(changeErrorState, fieldKeys.address) }/> }
      </InputItem>
      <InputItem { ...makeInputItemProps('Amount to send', fieldKeys.amount) }>
        { changeErrorState => <AmountInput { ...makeTextInputProps(changeErrorState, fieldKeys.amount) }/> }
      </InputItem>
      <InputItem { ...makeInputItemProps('OTP Authentication', fieldKeys.otp) }>
        { changeErrorState => <OtpInput { ...makeTextInputProps(changeErrorState, fieldKeys.otp) }/> }
      </InputItem>
      { !btcIsSent && <Button type='button' variant='primary' block onClick={sendBtc}>SEND BTC</Button> }
    </form>
  );
});
