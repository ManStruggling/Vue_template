const state = {
  token: "token_user",
  userInfo: {
    UId: 0,
    Name: null,
    Phone: null,
    HospitalId: 0,
    HospitalName: null,
    Role: 0,
    Type: null,
    DealerId: null,
    DealerName: null
  }
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERINFO: (state, obj) => {
    state.userInfo = obj;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-constant-condition
      if (true) {
        commit("SET_TOKEN", userInfo);
        resolve();
      } else {
        reject();
      }
    });
  },
  setUserInfo({ commit }, userInfo) {
    return new Promise(resolve => {
      commit("SET_USERINFO", userInfo);
      resolve();
    });
  }
};

export default {
  state,
  mutations,
  actions
};
