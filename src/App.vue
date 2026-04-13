<script setup lang="ts">
import { ref } from 'vue'

const teste = ref(0)
</script>

<template>
  <button @click="teste++">{{ teste }}</button>
</template>

<style scoped>
button {
  width: 64px;
  height: 32px;
  background-color: #007bff;
  border-radius: 8px;
}
</style>
