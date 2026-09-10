<script setup lang="ts">
import { modules } from '../config/modules'
</script>

<template>
  <div>
    <h2>欢迎使用 HeGui 数据平台</h2>
    <p>骨架阶段：各模块功能将随对应 OpenSpec change 逐步交付。</p>
    <el-row :gutter="16">
      <el-col v-for="m in modules" :key="m.module" :span="6" style="margin-bottom: 16px">
        <el-card shadow="hover" @click="$router.push(m.path)">
          <div>{{ m.title }}</div>
          <div style="color: #999; font-size: 12px">{{ m.module }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
