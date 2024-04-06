<template>
  <div>
  </div>
</template>
<script setup lang="ts">
import EventBus from '@/sdk/base/eventbus'
EventBus.on('redirect', (e: any) =>  useRouter().push(e) )
</script>