<script setup lang="ts">
import { RouterView } from 'vue-router'
import {helloVApiRequest} from 'vapirequest'
</script>

<template>
  <RouterView />
  helloVApiRequest: <span v-html="helloVApiRequest()" />
</template>

<style scoped>
</style>
