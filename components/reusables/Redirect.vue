<template>
  <div>
  </div>
</template>
<script setup lang="ts">
import { EventBus } from '@rajatjindal1983/crud-sdk'
EventBus.on('redirect', (e: any) => useRouter().push(e))
</script>