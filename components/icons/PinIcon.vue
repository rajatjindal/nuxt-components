<template>
  <svg width="24"
       height="24"
       :fill="selected ? 'red' : 'none'"
       viewBox="0 0 24 24">
    <path :stroke="selected ? 'red' : 'currentColor'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M8.75 7.75L7.75 4.75H16.25L15.25 7.75V10C18.25 11 18.25 14.25 18.25 14.25H5.75C5.75 14.25 5.75 11 8.75 10V7.75Z"></path>
    <path stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 14.5V19.25"></path>
  </svg>
</template>
<script>
export default {
  name: "PinIcon",
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>