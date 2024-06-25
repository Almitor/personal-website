<script setup lang="ts">
import { marked, Renderer} from "marked";
import axios from "axios";
import {onMounted, ref} from "vue";
import { useRoute } from "vue-router";
// import hljs from "highlight.js";

// 导入 highlight.js 的样式文件
// import "highlight.js/styles/github.css";

const markdownText = ref("");
const route = useRoute();

const renderer = new Renderer();


// 自定义图片渲染逻辑
renderer.image = ({ href, title, text }) => {
  // 如果 href 是以 http(s) 开头的网络地址或以 / 开头的绝对路径，则直接使用
  // 否则加上相对路径前缀
  const newHref = href.startsWith('http') || href.startsWith('/') ? href : `/notes/assets/${href.split('/').pop()}`;
  return `<img src="${newHref}" alt="${text}" title="${title || ''}" style="width: 100%">`;
};

// 配置 marked 使用自定义 Renderer
marked.setOptions({ renderer });


async function fetchMarkdown() {
  try {
    const filename = route.params.filename as string;
    const url = `/api/notes/${filename}`;
    const response = await axios.get(url);
    //
    // const customHighlight = (code: string, lang: string): string => {
    //   const language = hljs.getLanguage(lang) ? lang : "plaintext";
    //   return hljs.highlight(code, { language }).value;
    // };

    console.log(response.data); // 打印返回数据进行检查

    // 判断返回数据是否具有filename和content属性
    if (response.data && response.data.content) {
      markdownText.value = <string> marked(response.data.content);
    } else {
      console.error("Invalid response format or file not found:", response.data);
    }
  } catch (error) {
    console.error("Error fetching markdown file:", error);
  }
}

onMounted(() => {
  fetchMarkdown();
});
</script>

<template>
  <v-container >
    <v-row justify="center">
      <v-col cols="12" xs="12" md="8" >
        <v-container>
          <p v-html="markdownText" class="markdown-body"></p>
        </v-container>
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped>
@import "github-markdown-css/github-markdown.css";
.markdown-body {
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>