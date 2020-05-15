const getters = {
  token: state => state.user.token,
  test: state => state.settings.test,
  userInfo: state => state.user.userInfo
};
export default getters;
