<script setup lang="ts" name="Layout">
import img from '@/assets/favicon.webp';
import {useRoute, useRouter} from 'vue-router';
import {computed, reactive, ref, watch} from "vue";

const image = img;
const router = useRouter();
const route = useRoute();

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


const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched;
  const crumbs = [
    {
      title: '主页',
      disabled: false,
      href: router.resolve({ name: 'Person' }).href
    }
  ];

  matchedRoutes.forEach((r) => {
    const routeName = r.name;
    const itemName = items.find(item => item.value === routeName)?.name || routeName?.toString() || '';

    if (itemName !== '') {
      crumbs.push({
        title: itemName,
        disabled: false,
        href: router.resolve({ name: routeName || '' }).href
      });
    }
  });

  if (route.params.filename) {
    const filename = route.params.filename as string;
    const noteDetailIndex = crumbs.findIndex(item => item.title === 'NoteDetail');

    if (noteDetailIndex !== -1) {
      // 替换'NoteDetail'为'笔记'
      crumbs.splice(noteDetailIndex, 1, { title: '笔记', disabled: false, href: '/note' });
    }

    crumbs.push({
      title: filename,
      disabled: true,
      href: ''
    });
  }
  return crumbs;
});

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
    <v-container>
      <v-row justify="center" >
        <v-col cols="12" xs="12" sm="10" md="8">
          <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:item="{ item }" class="font-weight-bold text-white">
              <v-breadcrumbs-item :href="item.href" :disabled="item.disabled" >
                {{ item.title }}
              </v-breadcrumbs-item>
            </template>
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
    </v-container>
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