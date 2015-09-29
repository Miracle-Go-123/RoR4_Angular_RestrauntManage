class ApplicationMailer < ActionMailer::Base
  default from: "stash@stashit.com"
  # default_url_options[:host] = "localhost:3000"
  default_url_options[:host] = "https://stash-it-daily.herokuapp.com"
end
