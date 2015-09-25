Rails.application.routes.draw do


root 'statics#index'

get '/login', to: "statics#index"
get '/signup', to: "statics#index"
get '/resets', to: "statics#index"
delete '/logout', to: "sessions#logout", as: "logout"
post '/login', to: "users#login"

resources :resets, except: [:index, :destroy, :new]
resources :users, except: [:edit, :new]
resources :items, except: [:edit, :new]

delete '/lastsave', to: "items#lastsave"
post '/saveit', to: "items#saveit"
get '/getsaves', to: "items#getsaves"
get '/getglobal', to: "items#getglobal"


end
