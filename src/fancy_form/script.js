'use strict';

import validate from 'bitcoin-address-validation';

const address = document.getElementById('input-address');

address.onchange = event => {
  const { value } = event.target;
  if (!validate(value)) {
    address.classList.add('error-visible');
  }
};