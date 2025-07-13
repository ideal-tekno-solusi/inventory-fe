<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logoipsum-358.svg'

const isReady = ref(false)
const router = useRouter()

onMounted(async () => {
  await router.isReady()
  isReady.value = true
})
</script>

<template>
  <div v-if="!isReady" class="splash-screen">
    <img :src="logo" alt="Logo" />
    <el-icon size="2rem" color="#aaa">
      <icon-svg-spinners-180-ring />
    </el-icon>
  </div>
  <RouterView v-else />
</template>

<style scoped>
.splash-screen {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  background-color: #5f2e7d;
}
</style>
