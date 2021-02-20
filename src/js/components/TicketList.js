import Component from '../lib/core/Component.js';
<<<<<<< HEAD
import { $ } from '../lib/utils/dom.js';

class TicketList extends Component {
  mountTemplate() {
    const tickets = this.props.tickets.get();

    this.$target.innerHTML = `
      <div class="d-flex">
        <label class="flex-auto my-0">
          총 ${tickets.length}개를 구매하였습니다.
        </label>
        <div class="flex-auto d-flex justify-end pr-1">
          ${tickets.length ? this.createDetailModeToggleTemplate() : ''}
        </div>
      </div>
      <div id="ticket-list" class="d-flex flex-wrap">
        ${tickets.reduce(
          (acc, ticket) => acc + this.createTicketTemplate(ticket),
          ''
        )}
=======
import { $, $$ } from '../lib/utils/dom.js';

class TicketList extends Component {
  constructor($target, props) {
    super($target, props);
    this.props.tickets.subscribe(this.mountTemplate.bind(this));
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <div class="d-flex">
        <label class="flex-auto my-0">
          총 ${this.props.tickets.get().length}개를 구매하였습니다.
        </label>
        <div class="flex-auto d-flex justify-end pr-1">
          ${
            this.props.tickets.get().length
              ? this.createDetailModeToggleTemplate()
              : ''
          }
        </div>
      </div>
      <div id="ticket-list" class="d-flex flex-wrap">
        ${this.props.tickets
          .get()
          .reduce((acc, ticket) => acc + this.createTicketTemplate(ticket), '')}
>>>>>>> [1단계 - 행운의 로또 미션] 그루밍(강민경) 미션 제출합니다. (#14)
      </div>
    `;
  }

  createDetailModeToggleTemplate() {
    return `
        <label class="switch">
          <input id="detail-mode-toggle" type="checkbox" class="lotto-numbers-toggle-button" />
          <span class="text-base font-normal">번호보기</span>
        </label>
      `;
  }

  createTicketTemplate(ticket) {
    return `
      <div class="align-center">
        <span class="ticket mx-1 text-4xl">🎟️</span>
        <span class="lotto-numbers hide">${ticket.join(', ')}</span>
      </div>
    `;
  }

<<<<<<< HEAD
  subscribeStates() {
    this.props.tickets.subscribe(this.mountTemplate.bind(this));
  }

=======
>>>>>>> [1단계 - 행운의 로또 미션] 그루밍(강민경) 미션 제출합니다. (#14)
  initEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.id !== 'detail-mode-toggle') return;

<<<<<<< HEAD
      this.toggleDetailMode(target.checked);
    });
  }

  toggleDetailMode(isChecked) {
    if (isChecked) {
      this.turnDetailModeOn();
    } else {
      this.turnDetailModeOff();
    }
  }

=======
      if (target.checked) {
        this.turnDetailModeOn();
      } else {
        this.turnDetailModeOff();
      }
    });
  }

>>>>>>> [1단계 - 행운의 로또 미션] 그루밍(강민경) 미션 제출합니다. (#14)
  turnDetailModeOn() {
    $('#ticket-list').classList.add('flex-col', 'detail-mode');
  }

  turnDetailModeOff() {
    $('#ticket-list').classList.remove('flex-col', 'detail-mode');
  }
}

export default TicketList;
