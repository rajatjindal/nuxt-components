<template>
<div></div>
</template>
<script setup lang="ts">
import { fetchAuthDetails } from '@rajatjindal1983/crud-sdk';
const auth = fetchAuthDetails()
console.log("checking auth")
</script>