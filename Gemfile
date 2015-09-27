source 'https://rubygems.org'

gem 'bundler', '>= 1.8.4'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'
# Use postgresql as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Removed Turbolinks because I am using Angular 
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
# gem 'turbolinks'

gem 'rails_12factor', :group => :production

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

gem "bootstrap-sass"
gem "bootswatch-rails"
gem 'font-awesome-sass'

gem 'dotenv-rails', :groups => [:development, :test]

# Different Auth Options:

gem 'omniauth', '~> 1.2.2'

gem 'devise'  
gem 'angular_rails_csrf' 

source 'https://rails-assets.org' do
gem "rails-assets-angular-devise"
end



gem 'json'
gem 'handlebars_assets'

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem 'puma'

gem 'typhoeus'

gem 'sidekiq'

group :development do
  gem 'pry-rails'
  gem 'awesome_print'
  gem 'binding_of_caller'
  gem 'better_errors'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  gem 'rspec-rails', '~> 3.0'
  gem 'shoulda-matchers'
  gem "capybara"  
  gem 'capybara-email'
  gem 'launchy'
  gem 'shoulda'
  gem 'puma-rails'
  gem 'guard-rspec', require: false

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

