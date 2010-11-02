set :repository,  "git@github.com:insightmethods/sjsdavis.com.git"
set :user,        "sites"
set :domain,      "#{user}@insightmethods.com"
set :deploy_to,   "/home/sites/sjsdavis.com"
set :port,          4000
set :merb_env,      "preview"
set :processes,     1


desc "this is for staging"
task :staging do
 set :domain,        "idev@cmccompass.com"
 set :deploy_to,     "/home/idev/staging.cmccompass.com"
 set :port,          5000
 set :merb_env,      "staging"
end



namespace :vlad do

end