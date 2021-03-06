import { VantComponent } from '../common/component';

VantComponent({
  relation: {
    name: 'sidebar-item',
    type: 'descendant',
    linked(target) {
      this.children.push(target);
      this.setActive(this.data.activeKey);
    },
    unlinked(target) {
      this.items = this.children.filter(
        (item: WechatMiniprogram.Component.TrivialInstance) => item !== target
      );
      this.setActive(this.data.activeKey);
    }
  },

  props: {
    activeKey: {
      type: Number,
      value: 0,
      observer: 'setActive'
    }
  },

  beforeCreate() {
    this.children = [];
    this.currentActive = -1;
  },

  methods: {
    setActive(activeKey: number) {
      const { children, currentActive } = this;

      if (!children.length) {
        return Promise.resolve();
      }

      this.currentActive = activeKey;

      const stack = [];

      if (currentActive !== activeKey && children[currentActive]) {
        stack.push(children[currentActive].setActive(false));
      }

      if (children[activeKey]) {
        stack.push(children[activeKey].setActive(true));
      }

      return Promise.all(stack);
    }
  }
});
