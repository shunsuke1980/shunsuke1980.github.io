---
layout: post
title:  "Tail command through capistrano"
date:   2011-02-04 09:00:00 +0900
categories: installation
---

```ruby
desc "tail production log files"
task :tail_logs, :roles => ENV['ROLE'] do
 default_run_options[:pty] = true
 run "tail -f #{shared_path}/log/production.log" do |channel, stream, data|
   puts  # for an extra line break before the host name
   puts "#{channel[:host]}: #{data}"
   break if stream == :err
 end
end
```