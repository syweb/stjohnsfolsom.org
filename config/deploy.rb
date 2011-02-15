set :repository,  "git@github.com:syweb/stjohnsfolsom.org.git"
set :user,        "sites"
set :domain,      "#{user}@insightmethods.com"
set :deploy_to,   "/home/sites/stjohnfolsom.org/current/public/test"



desc "this is for production"
task :production do
  set :deploy_to,   "/home/sites/stjohnfolsom.org"
end


namespace :vlad do

end