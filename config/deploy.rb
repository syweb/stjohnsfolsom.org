set :application, "stjohnfolsom.org"
set :repository,  "git@github.com:syweb/stjohnsfolsom.org.git"
set :user,        "ubuntu"
set :domain,      "#{user}@insightmethods.com"
set :deploy_to,   "/home/#{user}/sites/#{application}/current/public/test"
set :revision,    "origin/master"


desc "this is for production"
task :production do
  set :deploy_to,   "/home/#{user}/sites/#{application}"
  set :keep_releases, 3
end