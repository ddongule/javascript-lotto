export default class Component {
  $target;
  props;

  constructor($target, props = {}) {
    this.$target = $target;
    this.props = props;
    this.initStates();
    this.subscribeStates();
    this.render();
    this.initEvent();
  }

  render() {
    this.mountTemplate();
    this.mountChildComponents();
  }

  initStates() {}

  initEvent() {}

  mountTemplate() {}

  mountChildComponents() {}
<<<<<<< HEAD

  subscribeStates() {}
=======
>>>>>>> [1단계 - 행운의 로또 미션] 그루밍(강민경) 미션 제출합니다. (#14)
}
