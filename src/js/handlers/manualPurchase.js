import { EXCEED_MONEY_AMOUNT } from '../lib/constants/alertMessage.js';
import { TICKET_NUMBER_AMOUNT, TICKET_PRICE } from '../lib/constants/lotto.js';
import {
  $,
  disableElements,
  focusInput,
  insertAfter,
} from '../lib/utils/dom.js';
import { getValueFromElements, sliceArray } from '../lib/utils/lotto.js';
import {
  createAutoPurchaseTemplate,
  createManualInputTemplate,
  createWinningNumberInputTemplate,
} from '../lib/utils/template.js';
import { lotto } from '../model/lotto.js';
import { money } from '../model/money.js';
import inputNumberDuplicateHandler from './input/inputNumberDuplicate.js';
import inputNumberRangeHandler from './input/inputNumberRange.js';
import lottoPurchaseHandler from './lottoPurchase.js';
import winningNumberSubmitHandler from './winningNumberSubmit.js';

const getManualInputs = (event, begin) => {
  return [...event.target.elements].slice(
    begin,
    event.target.elements.length - 1
  );
};

const buyManualNumber = event => {
  event.preventDefault();
  const manualNumberElements = getManualInputs(event, 0);
  const manualNumbersArray = sliceArray(
    getValueFromElements(manualNumberElements),
    TICKET_NUMBER_AMOUNT
  );

  lotto.tickets = manualNumbersArray;

  const newAvailableAmount = money.totalAmount / TICKET_PRICE;
  if (newAvailableAmount === 0) {
    insertAfter(event.target, createWinningNumberInputTemplate());

    $('#winning-number-form').addEventListener(
      'change',
      inputNumberDuplicateHandler
    );
    $('#winning-number-form').addEventListener(
      'change',
      inputNumberRangeHandler
    );
    $('#winning-number-form').addEventListener(
      'submit',
      winningNumberSubmitHandler
    );
    disableElements(event);
    focusInput('.winning-number', 'first');
    return;
  }

  $('#remaining-money').innerHTML = money.totalAmount;
  disableElements(event);
  insertAfter(event.target, createAutoPurchaseTemplate());
  $('#auto-purchase-form').addEventListener('submit', lottoPurchaseHandler);
  focusInput('input', 'auto-purchase-input');
};

const manualPurchaseHandler = event => {
  event.preventDefault();
  const manualPurchaseAmount = Number(
    event.target.elements['manual-purchase-input'].value
  );
  money.manualPurchase = manualPurchaseAmount * TICKET_PRICE;
  const availableAmount = Math.floor(money.totalAmount / TICKET_PRICE);

  if (money.totalAmount < money.manualPurchase) {
    alert(EXCEED_MONEY_AMOUNT(availableAmount));
    event.target.reset();
    return;
  }

  money.totalAmount -= money.manualPurchase;
  disableElements(event);
  if (manualPurchaseAmount !== 0) {
    insertAfter(event.target, createManualInputTemplate(manualPurchaseAmount));
    $('#manual-number-form').addEventListener(
      'change',
      inputNumberDuplicateHandler
    );
    $('#manual-number-form').addEventListener(
      'change',
      inputNumberRangeHandler
    );
    $('#manual-number-form').addEventListener('submit', buyManualNumber);
    focusInput('.manual-number', 'first');
  } else {
    insertAfter(event.target, createAutoPurchaseTemplate());
    focusInput('input', 'auto-purchase-input');
    $('#auto-purchase-form').addEventListener('submit', lottoPurchaseHandler);
  }

  $('#remaining-money').innerHTML = money.totalAmount;
};

export default manualPurchaseHandler;
