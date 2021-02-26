var store = [{
        "title": "Tail command through capistrano",
        "excerpt":"desc \"tail production log files\"task :tail_logs, :roles =&gt; ENV['ROLE'] do default_run_options[:pty] = true run \"tail -f #{shared_path}/log/production.log\" do |channel, stream, data|   puts  # for an extra line break before the host name   puts \"#{channel[:host]}: #{data}\"   break if stream == :err endend","categories": ["installation"],
        "tags": [],
        "url": "/installation/tail_command_through_capistrano/"
      },{
        "title": "Installing Rails5.2, Vue3.0 and Typscript",
        "excerpt":"Rails $ bundle init$ echo 'gem \"rails\", \"5.2.2.1\"' &gt;&gt; Gemfile$ bundle install --path vendor/bundle# Don't use --webpack=vue . --webpack=vue is for Vue2.6$ bundle exec rails _5.2.2.1_ new . --skip-coffee --skip-turbolinks --skip-test-unit --webpack Open browser (localhost:3000).$ bundle exec rails s Error happens about sqlite. Change sqlite gem version in Gemfile. gem...","categories": ["installation"],
        "tags": [],
        "url": "/installation/installing_rails_vue3_ts/"
      },{
        "title": "3 tips rails debug",
        "excerpt":"rdebug-ide How to debug for Rails application using VSCode. Install ruby extention to VSCodehttps://marketplace.visualstudio.com/items?itemName=rebornix.Ruby Add this code to your Gemfile and bundle install to your Rails applicationgroup :development do # Debug for vscode gem \"ruby-debug-ide\" gem \"debase\"end Add config to your VSCodeAdd this config to .vscode/launch.json { \"version\": \"0.2.0\", \"configurations\":...","categories": ["installation"],
        "tags": [],
        "url": "/installation/rails-debug/"
      }]
