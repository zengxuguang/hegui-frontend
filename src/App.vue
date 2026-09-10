<script setup lang="ts">
import { useRoute } from 'vue-router'
import { modules } from './config/modules'

const route = useRoute()
</script>

<template>
  <el-container class="layout">
    <el-aside width="220px" class="aside">
      <div class="logo">HeGui 数据平台</div>
      <el-menu :default-active="route.path" router>
        <el-menu-item index="/">
          <span>首页</span>
        </el-menu-item>
        <el-menu-item v-for="m in modules" :key="m.module" :index="m.path">
          <span>{{ m.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">{{ route.meta.title }}</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.layout {
  height: 100%;
}

.aside {
  border-right: 1px solid #e6e6e6;
}

.logo {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
}

.header {
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  font-size: 16px;
}
</style>
