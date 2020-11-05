Component({
  data: {
  },
  props: {
    onBtnMsgCard: () => {
    },
    onBtnItem: () => {
    }
  },
  didMount() {
  },
  methods: {
    onBtnMsgCard(e) {
      this.props.onBtnMsgCard(e);
    },
    onBtnItem(e) {
      this.props.onBtnItem(e);
    }
  }
});
