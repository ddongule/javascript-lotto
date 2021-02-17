import Component from '../lib/core/Component.js';

class TicketList extends Component {
  constructor($target, props) {
    super($target, props);
    this.props.tickets.subscribe(this.mountTemplate.bind(this));
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <div class="d-flex">
        <label class="flex-auto my-0">총 ${
          this.props.tickets.get().length
        }개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input type="checkbox" class="lotto-numbers-toggle-button" />
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div class="d-flex flex-wrap">
      ${this.createTicketTemplate().repeat(this.props.tickets.get().length)}
      </div>
    `;
  }

  createTicketTemplate() {
    return `<span class="ticket mx-1 text-4xl">🎟️</span>`;
  }
}

export default TicketList;
