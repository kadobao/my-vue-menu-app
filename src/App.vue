<template>
  <div>
    <el-container v-if="isLoggedIn">
      <!-- 顶部导航 -->
      <el-header>
        <el-menu
          mode="horizontal"
          default-active="1"
          router
          class="el-menu-demo"
        >
          <el-menu-item index="/">
            <el-icon><location /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><icon-menu /></el-icon>
            <span>关于我们</span>
          </el-menu-item>
          <el-menu-item index="/contact">
            <el-icon><setting /></el-icon>
            <span>联系我们</span>
          </el-menu-item>

          <!-- 添加全屏切换按钮 -->
          <el-menu-item @click="toggleFullScreen">
            <el-icon>
              <full-screen v-if="!isFullscreen" />
              <aim v-else />
            </el-icon>
            <span>{{ isFullscreen ? '退出全屏' : '全屏' }}</span>
          </el-menu-item>




          <el-menu-item index="/logout" @click="logout">
            <el-icon><icon-exit /></el-icon>
            <span>登出</span>
          </el-menu-item>
        </el-menu>
      </el-header>

      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            router
          >
            <el-menu-item index="/">
              <el-icon><location /></el-icon>
              <span>首页</span>
            </el-menu-item>

            <!-- 子菜单 -->
            <el-sub-menu index="settings">
              <template #title>
                <el-icon><icon-menu /></el-icon>
                <span>设置</span>
              </template>
              <el-menu-item-group title="用户设置">
                <el-menu-item index="/settings/profile">个人信息</el-menu-item>
                <el-menu-item index="/settings/security">安全设置</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="系统设置">
                <el-menu-item index="/settings/theme">主题</el-menu-item>
                <el-menu-item index="/settings/notifications">通知</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-menu-item index="/help">
              <el-icon><setting /></el-icon>
              <span>帮助</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主体内容 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>

    <router-view v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Location, Menu as IconMenu, Setting, CircleClose as IconExit, FullScreen, Aim } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
const isFullscreen = ref(false)


// 监听路由变化，如果从登录页面跳转出来，刷新 isLoggedIn 的状态
watch(
  () => route.fullPath,
  () => {
    isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  }
)

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  isLoggedIn.value = false
  router.push('/login')
}

// 全屏切换功能
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      isFullscreen.value = false
    }
  }
}

// 使用 watchEffect 监听全屏变化
watchEffect(() => {
  isFullscreen.value = !!document.fullscreenElement
})
</script>

<style>
/*左侧导航栏的样式*/
.el-menu-vertical-demo {
  height: 100%;
  border-right: 1px solid #d3dce6;   /*这是给这个元素的右侧添加一条边框，宽度为 1 像素，颜色为浅灰色（#d3dce6）。这种边框常用于为左侧导航栏和页面其他部分之间增加一个视觉分隔，使得布局更清晰。*/
}
.el-menu-demo {
  background-color: #545c64;
  color: #fff;
}
</style>