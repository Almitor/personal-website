<script setup lang="ts" name="Layout">
import img from '@/assets/favicon.webp';
import {useRouter} from 'vue-router';
import {ref} from "vue";


const image = img;
const router = useRouter();
const items = [
  {name:'博客', value:'Blog'},
  {name:'笔记', value:'Note'},
  {name:'作品', value:'Work'},
  {name:'其他', value:'Other'}
]

// 根据导航栏中按钮的value跳转相应的页面
function navigateTo(name: string){
  router.push({
    name: name
  })
}

// 跳转首页
function indexTo(){
  router.push({
    name: "Person"
  })
}

const drawer = ref(false);

</script>

<template>
<v-layout>
  <v-app-bar
    class="appbar"
    density="comfortable"
  >
    <template v-slot:prepend>
      <v-avatar>
        <v-img
          :src="image"
          @click="indexTo"
        >
        </v-img>
      </v-avatar>
    </template>
    <v-app-bar-title>胡明海的个人网站</v-app-bar-title>

    <v-btn
        class="navBtn"
        size="x-large"
        height="100%"
        v-for="item in items"
        @click='navigateTo(`${item.value}`)'
    >
      {{ item.name }}
    </v-btn>

    <v-app-bar-nav-icon
        @click.stop="drawer=!drawer"
        class="navMenu"
    >
    </v-app-bar-nav-icon>
  </v-app-bar>
  <v-navigation-drawer
      v-model="drawer"
      temporary
      location="top"
  >
    <v-list>
      <v-list-item
          v-for="item in items"
          :key="item.value"
          @click="navigateTo(item.value)"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main class="bg-blue-grey-lighten-3">
      <router-view/>
  </v-main>
</v-layout>
</template>

<style scoped>
.appbar {
  background-color: #155263;
  color: white;
}
@media (min-width: 300px) and (max-width: 768px){
  .navBtn {
    display: none;
  }
  .navMenu {
    display: block;
  }
}

@media (min-width: 769px){
  .navBtn {
    display: block;
  }
  .navMenu {
    display: none;
  }
}

</style>