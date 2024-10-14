<template>
    <div class="not-found">
      <h1>404</h1>
      <h2>页面不存在</h2>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goHome = () => {
    router.push('/')
  }
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  h1 {
    font-size: 72px;
    margin-bottom: 0;
  }
  
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
  }
  </style>