---
layout: post
title:  "Rails5.2 + Vue3.0 + Typscriptのセットアップ"
date:   2021-01-30 09:16:26 +0900
categories: installation
---
<!--
    So Simple Jekyll Theme 3.0.0
    Copyright 2013-2018 Michael Rose - mademistakes.com | @mmistakes
    Free for personal and commercial use under the MIT license
    https://github.com/mmistakes/so-simple-theme/blob/master/LICENSE
-->

## Railsセットアップ

```
$ bundle init
$ echo 'gem "rails", "~> 6.0.3"' >> Gemfile
$ bundle install --path vendor/bundle
# ここで、--webpack=vueを指定するとVue2.6が入ってしまうので、指定しない
$ bundle exec rails _5.2.2.1_ new . --skip-coffee --skip-turbolinks --skip-test-unit --webpack
```

- 動作確認

```
$ bundle exec rails s
```
- localhost:3000で画面を見ようとしたら、sqlite関連でエラー

- GemfileでsqliteのVersionをダウングレード
    - `gem 'sqlite3', '~> 1.3.6'`
  
```
$ bundle install --path vendor/bundle
```

- localhost:3000で Hello worldをブラウザから確認

## Vue3のセットアップ

- Vue用のパッケージをインストール

```
$ yarn add --dev vue@next vue-loader@next @vue/compiler-sfc
```
- package.jsonで、Vueのバージョンを確認

```
{
  "name": "rails_vue3_ts",
  "private": true,
  "dependencies": {},
  "devDependencies": {
    "@vue/compiler-sfc": "^3.0.5",
    "vue": "^3.0.5",
    "vue-loader": "^16.1.2"
  }
}
```

- Webpack でVueもコンパイルするように設定

```
const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
environment.plugins.prepend(
    'VueLoaderPlugin',
    new VueLoaderPlugin()
)
environment.loaders.prepend('vue', {
    test: /\.vue$/,
    use: [{
        loader: 'vue-loader'
    }]
})
module.exports = environment
```
- config/webpacker.yml の extensions に .vue を追加

## 画面から確認できるように空のロジック（Railsのみ）を作成

- generateコマンド

```
$ bundle exec rails g controller HelloWorld index --no-helper --no-asset
```

- 画面を確認

```
http://0.0.0.0:3000/hello_world/index
```

## 空のロジックをVue3対応する

- Vueファイル作成

app/javascript/app.vue

```
<template>
  <p>
    {{ message }}
  </p>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello Vue!"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: left;
}
</style>
```

app/views/hello_vue/index.html.erb

```
<h1>HelloWorld#index</h1>
<p>Find me in app/views/hello_world/index.html.erb</p>
<div id='vue-app'></div>
```

app/javascript/packs/hello_world.js

```
import { createApp } from "vue";
import App from "../app.vue";

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp(App);
  app.mount("#vue-app");
});
```

- 画面に「Hello Vue!」が表示されていることを確認

```
http://0.0.0.0:3000/hello_world/index
```

## Vue3をTypscriptでもかけるように

- `bin/rails webpacker:install:typescript`

