---
layout: post
title:  "Installing Rails5.2, Vue3.0 and Typscript"
date:   2021-01-30 09:00:00 +0900
categories: installation
---

## Rails

```shell
$ bundle init
$ echo 'gem "rails", "5.2.2.1"' >> Gemfile
$ bundle install --path vendor/bundle
# Don't use --webpack=vue . --webpack=vue is for Vue2.6
$ bundle exec rails _5.2.2.1_ new . --skip-coffee --skip-turbolinks --skip-test-unit --webpack
```

- Open browser (localhost:3000).

```shell
$ bundle exec rails s
```

- Error happens about sqlite.

- Change sqlite gem version in Gemfile.
    - `gem 'sqlite3', '~> 1.3.6'`

```shell
$ bundle install --path vendor/bundle
```

- Open browser (localhost:3000). You can see Hello world.

## Set up Vue3

- Installing Vue3

```shell
$ yarn add --dev vue@next vue-loader@next @vue/compiler-sfc
```
- Check version in package.json.

```json
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

- Setting Webpack for compiling Vue

```ruby
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
- Edit config/webpacker.yml for adding .vue extensions.

## Operation check

- Generate emty rails logic.

```shell
$ bundle exec rails g controller HelloWorld index --no-helper --no-asset
```

- Open browser

```
http://0.0.0.0:3000/hello_world/index
```

## Generate emty vue3 logic.

- Create Vue file

app/javascript/app.vue

```vue
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

```html
<h1>HelloWorld#index</h1>
<p>Find me in app/views/hello_world/index.html.erb</p>
<div id='vue-app'></div>
```

app/javascript/packs/hello_world.js

```js
import { createApp } from "vue";
import App from "../app.vue";

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp(App);
  app.mount("#vue-app");
});
```

- Open browser

```
http://0.0.0.0:3000/hello_world/index
```

## Enable Typscript for Vue3

- `bin/rails webpacker:install:typescript`

