import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './styles.module.scss';

export const InputItemError = React
  .memo(({ error }) => <Form.Text className={styles.error}>{error}</Form.Text>);
