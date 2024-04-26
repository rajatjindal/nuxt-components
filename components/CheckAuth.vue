<template>
<div></div>
</template>
<script setup lang="ts">
import { fetchAuthDetails } from '../sdk/auth/auth';
const auth = fetchAuthDetails()
console.log("checking auth")
</script>