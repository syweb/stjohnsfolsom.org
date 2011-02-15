set :repository,  "git@github.com:syweb/stjohnfolsom.org.git"
set :user,        "sites"
set :domain,      "#{user}@insightmethods.com"
set :deploy_to,   "/home/sites/stjohnfolsom.org/test"



desc "this is for production"
task :production do
  set :repository,  "git@github.com:insightmethods/stjohnfolsom.org.git"
  set :deploy_to,   "/home/sites/stjohnfolsom.org"
end


namespace :vlad do

end