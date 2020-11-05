import { connect } from 'herculex';

Component({
  data: {
  },
  props: {
    onBtnItem: () => {
    }
  },
  didMount() { },
  methods: {
    onBtnItem(e) {
      this.props.onBtnItem(e);
    }
  }
});
