//检查权限
import store from "@/store";

export default {
  inserted(el, binding) {
    const { value } = binding;
    const role = store.getters && store.getters.userInfo.Role;

    if (value === 0 || value === 1) {
      const hasPermission = value === role;

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need roles! Like v-permission="1`);
    }
  }
};
