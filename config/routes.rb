Rails.application.routes.draw do


root 'statics#index'

get '/login', to: "statics#index"
get '/signup', to: "statics#index"




delete '/logout', to: "sessions#logout", as: "logout"

post '/login', to: "users#login"

resources :users, except: [:edit, :new]






end
