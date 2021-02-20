import createRandomNumber from './random.js';
import {
  TICKET_NUMBERS_LENGTH,
  TICKET_PRICE,
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
} from '../constants/ticket.js';

export const createTicket = () => {
  const ticket = new Set();

  while (ticket.size < TICKET_NUMBERS_LENGTH) {
    ticket.add(createRandomNumber(TICKET_MIN_NUMBER, TICKET_MAX_NUMBER));
  }

  return [...ticket];
};

export const getNumberOfTickets = value =>
  Math.floor(Number(value) / TICKET_PRICE);

export const getRank = (ticket, winningNumber) => {
  let score = 0;

  ticket.forEach(number => {
    if (winningNumber.main.includes(number)) {
      score += 1;
    }
  });

  if (score === 5 && ticket.includes(winningNumber.bonus)) {
    return 'second';
  }

  if (score < 3) {
    return 'loser';
  }

  return ['fifth', 'fourth', 'third', 'first'][score - 3];
};

export const getWinners = (tickets, winningNumber) => {
  const winners = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  tickets.forEach(ticket => {
    const rank = getRank(ticket, winningNumber);

    if (rank !== 'loser') {
      ticket[rank] += 1;
    }
  });

  return winners;
};
