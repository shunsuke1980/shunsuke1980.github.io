---
layout: post
title:  "libv8 instaling error"
date:   2019-12-28 09:00:00 +0900
categories: installation
---

macOS Catalinaでrbenv環境の場合です。

libv8とtherubyracerがbundle install で入らない問題に遭遇しました。
ネットで調べるとよくある問題のようで、v8のバージョン問題だから、v8-315をインストールして、.bundle/configを設定する記事が多くみつかります。

macOS Mojaveで古いlibv8とtherubyracerが入らない時の対処法
https://qiita.com/shimx/items/32e85093f21e673c7127

私の場合は、別の問題と複合だったようで、この設定だけでは解決しませんでした。
原因は、rbenv環境だったのですが、bundleがrbenv内のgemを使っていないのが問題のようでした。
rbenvにbundleをインストール後に、bundle installが通りました。


# Macデフォルトのbundleを使っている

```shell
$ which bundle
/usr/bin/bundle

$ rbenv exec gem install bundler
Fetching: bundler-2.1.2.gem (100%)
Successfully installed bundler-2.1.2
Parsing documentation for bundler-2.1.2
Installing ri documentation for bundler-2.1.2
Done installing documentation for bundler after 4 seconds
1 gem installed

# rbenvのbundleに変更
$ which bundle
/Users/abc/.rbenv/shims/bundle
```