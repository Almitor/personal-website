<script lang="ts">
import img from '@/assets/favicon.ico'
  export default {
    name: 'Person',
    data(vm) {
      return {
        imageSrc:'http://111.230.44.48:3000/images/favicon-BU8zOGwP.ico'
        // imageSrc:img
      };
    },
  }
</script>

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" xs="12" sm="10" md="8"  @click.stop>
        <v-card class="home-card pa-5"  elevation="24" >
          <v-card-item>
            <v-card-title class="text-h5">胡明海的个人网站</v-card-title>
            <v-card-subtitle class="mt-2">Hu MingHai's Personal Website</v-card-subtitle>
          </v-card-item>

          <v-divider></v-divider>

          <v-row align="center" class="mt-2">
            <v-col cols="12" xs="12" sm="12" md="6">
              <v-list-item class="justify-center w-100">
                <v-img
                    :src="imageSrc"
                    class="roundedImg"
                ></v-img>
              </v-list-item>
              <v-card-subtitle >www.almytor.cn</v-card-subtitle>
              <v-list-item>
                <a href="https://github.com/Almitor" class="mr-5">
                  <v-icon>mdi-github</v-icon>
                </a>
                <a href="#" >
                  <v-overlay
                      activator="parent"
                      location-strategy="connected"
                      origin="bottom start"
                      scroll-strategy="close"
                  >
                    <v-card class="pa-2">
                      2862710232@qq.com
                    </v-card>
                  </v-overlay>
                  <v-icon>mdi-email</v-icon>
                </a>
              </v-list-item>
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="6" >
              <v-row>
                <v-col cols="6" class="pa-1">
                  <v-card class="col-card" hover>
                    <v-card-item><v-icon>mdi-note</v-icon></v-card-item>
                    <v-card-title>博客</v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="6" class="pa-1">
                    <v-card class="col-card" hover>
                      <v-card-item><v-icon>mdi-book-open-variant-outline</v-icon></v-card-item>
                      <v-card-title>笔记</v-card-title>
                    </v-card>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" class="pa-1">
                    <v-card class="col-card" hover>
                      <v-card-item><v-icon>mdi-web</v-icon></v-card-item>
                      <v-card-title>作品</v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="6" class="pa-1">
                    <v-card class="col-card" hover>
                      <v-card-item><v-icon>mdi-view-grid-plus-outline</v-icon></v-card-item>
                      <v-card-title>其他</v-card-title>
                    </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.home-card {
  text-align: center;
  color: white;
  font-family: Georgia, Times, serif;
  background: rgba(0,0,0,0.5);
}
.roundedImg {
  display: inline-block;
  border-radius: 50%;
  width: 60%;
}
a {
  color: inherit;
  display: inline-block;
  transition: all 0.3s; /* 添加过渡动画效果 */
}

a:hover {
  transform: translateY(-3px); /* 添加浮动效果 */
}
.col-card {
  width: 100%;
  background: rgba(0,0,0,0.3);
  color: #eeeeee;
}
</style>
