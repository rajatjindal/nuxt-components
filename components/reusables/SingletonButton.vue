<template>
  <span v-on:click="clickEvent"
        :class="{ 'inline-flex justify-center py-1.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500': true, 'bg-indigo-600 hover:bg-indigo-700': !runningFunc, 'bg-gray-500': runningFunc }">
    {{ runningFunc ? 'Submitting...' : text }}
  </span>
</template>
<script>
export default {
  name: "SingletonButton",
  data() {
    return {
      runningFunc: false,
    };
  },
  props: ["func", "text"],
  methods: {
    clickEvent: async function () {
      if (this.runningFunc) {
        return;
      }

      this.runningFunc = true;
      try {
        await this.func();
      } catch (err) {
        console.log("failed with err2 ", err);
      }

      setTimeout(() => {
        this.runningFunc = false;
      }, 3000);
    },
  },
};
</script>