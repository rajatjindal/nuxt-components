<template>
  <div class="navbar-item w-10 h-10 fixed bottom-0 z-10 left-0 border bg-primary-500 px-2 text-neutral-50 rounded-lg -ml-2 -mb-2"
       v-on:click="$emit('burger-clicked')">
    <chevron-right class="mt-1" />
  </div>
</template>