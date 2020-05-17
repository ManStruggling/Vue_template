<template>
  <div class="test">
    <h1>This is an test page</h1>
    <h2>{{ "ball" | uppercaseFirst }}</h2>
  </div>
</template>
<script>
export default {
  created() {
    this.request({
      method: "get",
      url: "/data/index"
    }).then(response => {
      console.log(response);
    });
  }
};
</script>