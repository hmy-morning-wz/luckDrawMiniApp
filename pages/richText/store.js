import Store from 'herculex';
// import parse from 'mini-html-parser2';
import queryDetail from '../../services/queryDetail';

export default new Store({
  // connectGlobal: true, // 是否关联global
  state: {
  },
  actions: {
    /**
     * 获取文章html
     */
    async queryDetail({ commit }) {
      const { success, data } = await queryDetail();
      if (success) {
        // data.articleContent && parse(data.articleContent, (err, nodes) => {
        //   console.log(nodes, err);
        //   if (!err) {
        //     commit('SET_ARTICLE_DETAIL', { nodes });
        //   }
        // });
      }
    }
  }
});
