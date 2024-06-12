<script lang="ts">
  import { defineComponent } from 'vue';
  import Person from "./components/Person.vue";
  import {VApp, VContainer, VMain} from "vuetify/components";


  export default defineComponent({
    name:'App',
    components: {
      VApp,
      VMain,
      VContainer,
      Person
    },
    data(vm) {
        return {
          backgrounds: [
            'http://111.230.44.48:3000/images/1-Im6q8Z6n.jpg',
            'http://111.230.44.48:3000/images/2-LZzm664H.jpg',
            'http://111.230.44.48:3000/images/3-CAVL3d74.jpg',
            'http://111.230.44.48:3000/images/4-LZzm664H.jpg',
            'http://111.230.44.48:3000/images/5-BEng0STi.jpg',
            'http://111.230.44.48:3000/images/6-Cvdeb8E.jpg',
            'http://111.230.44.48:3000/images/7-DrNcJx8W.jpg',
            'http://111.230.44.48:3000/images/8-Ynu1fSV2.jpg',

            // new URL('@/assets/1.jpg', import.meta.url).href,
            // new URL('@/assets/2.jpg', import.meta.url).href,
            // new URL('@/assets/3.jpg', import.meta.url).href,
            // new URL('@/assets/4.jpg', import.meta.url).href,
            // new URL('@/assets/5.jpg', import.meta.url).href,
            // new URL('@/assets/6.jpg', import.meta.url).href,
            // new URL('@/assets/7.jpg', import.meta.url).href,
            // new URL('@/assets/8.jpg', import.meta.url).href,
          ],
          currentBacImgIndex:0
        }
    },
    methods: {
      changeBacImg() {
        const randomIndex = Math.floor(Math.random() * this.backgrounds.length);
        this.currentBacImgIndex = randomIndex;
      }
    },
    computed: {
      currentBacImg() {
        return {
          backgroundImage: `url(${this.backgrounds[this.currentBacImgIndex]})`,
        }
      }
    },
    created() {
      this.changeBacImg();
    }
  })
</script>

<template>
  <v-app>
    <div class="bg-container d-flex flex-column" :style="currentBacImg" @click="changeBacImg">
      <Person/>
    </div>
  </v-app>

</template>

<style >
  html,body,#app{
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .bg-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
