const productRouter = {
  path: "/test",
  name: "test",
  meta: {
    title: "测试"
  },
  component: () => import("@/views/Test")
};
export default productRouter;
