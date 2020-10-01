import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './styles.module.scss';

export const InputItemHeader = React
  .memo(({ header }) => <Form.Label className={styles.header}>{header}</Form.Label>);
