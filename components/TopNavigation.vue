<template>
  <div class="bg-primary-500 flex justify-between px-5 h-16">
    <div v-on:click="burgerClicked"
         class="text-neutral-50 font-bold my-auto flex">
      <div>
        <burger-icon />
      </div>
      <div class="ml-5">BK Print & Pack</div>
    </div>
    <div v-if="!isAuthenticated"
         v-on:click="login"
         class="text-neutral-50 font-bold my-auto">
      Login
    </div>
    <div v-else
         v-on:click="logout"
         class="text-neutral-50 font-bold my-auto">
      Logout
    </div>
  </div>
</template>
<script setup lang="ts">
import { login, logout } from "../sdk/auth/auth"

const emit = defineEmits(['burger-clicked'])
const burgerClicked = function() {
  emit('burger-clicked', '')
}

// remark-list :beforeRemarkAddHook="async function () { await updateAnswers(beforeCompletionQuestions[job.task.taskId], job.task) && await actionUpdateStatus({ taskId: job.task.taskId, rowVersion: job.task.rowVersion, oldStatus: job.task.status, newStatus: 'completed' }) }"
const props = defineProps({
  isAuthenticated: { type: Boolean, default: false },
})

</script>
