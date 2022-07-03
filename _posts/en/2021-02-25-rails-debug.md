---
layout: post
title:  "3 tips rails debug"
date:   2021-02-25 09:00:00 +0900
categories: installation
---

## rdebug-ide

How to debug for Rails application using VSCode.

- Install ruby extention to VSCode

https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby

- Add this code to your `Gemfile` and `bundle install` to your Rails application

```ruby
group :development do
  # Debug for vscode
  gem "ruby-debug-ide"
  gem "debase"
end
```
- Add config to your VSCode

Add this config to `.vscode/launch.json`

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Rails",
      "type": "Ruby",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "program": "${workspaceRoot}/bin/rails",
      "pathToRDebugIDE": "${workspaceRoot}/vendor/bundle/ruby/2.4.0/bin/rdebug-ide",
      "useBundler": true,
      "args": [
        "server"
      ]
    }
  ]
}
```

![vscode](/images/2021-02-25-vscode.png)

## pry

- Automatically require some gems for pry command


```shell
❯ tail ~/.pryrc
begin
  require 'awesome_print'
  require 'tapp'
rescue LoadError
else
  AwesomePrint.pry!
end
```
## awesome_print

- Show params for human friendly.

```shell
❯ bundle exec pry
[1] pry(main)> h = { a:100, b:200 }}

{
    :a => 100,
    :b => 200
}
```

## tapp

- Useful gem for print debug. Print values in method chain.

```shell
❯ bundle exec pry
[1] pry(main)> { a:100, b:200 }.tapp.to_a.tapp.first.tapp
{:a=>100, :b=>200}
[[:a, 100], [:b, 200]]
[:a, 100]
[
    [0] :a,
    [1] 100
]
```

- Sometimes I forgot print debug code using p and pp. But `tapp` gems prepare command for findind debug code.

```shell
bundle exec tapp grep
```
