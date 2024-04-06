<template>
  <div class="grid grid-rows px-4 xl:px-10 py-10 gap-4 fixed top-16 left-0 overflow-y-auto h-5/6 z-20">
    <div class="w-72 -ml-2 fixed top-0 left-0 bg-primary-500 mx-auto text-center text-neutral-50 font-bold px-7 h-16"
         v-on:click="$emit('burger-clicked')">
      <div class="text-neutral-50 mt-5 flex">
        <burger-icon />
        <div class="ml-5 text-neutral-50">BK Print & Pack</div>
      </div>
    </div>

    <div class="flex">
      <building-icon />
      <nuxt-link to="/"
                 class="ml-3 mt-0.5 text-sm font-medium text-gray-800">Index</nuxt-link>
    </div>

  </div>
</template>
<script>
export default {
  name: "navigation",
  data() {
    return {};
  },
  props: ["isAuthenticated"],
  computed: {
    user() {
      return this.$auth.user.email;
    },
  },
};
</script>