import defaultSettings from "@/settings";
const state = {
  test: 1,
  slideBarOpended: defaultSettings.slideBarOpended
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  }
};

export default {
  state,
  mutations,
  actions
};
