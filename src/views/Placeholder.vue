<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <el-empty :description="`${route.meta.title} 模块建设中，随对应 OpenSpec change 交付`" />
</template>
