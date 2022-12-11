Rails.application.routes.draw do
  
  resources :reviews
  resources :rents
  resources :arts

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#login"
  delete "/logout", to: "sessions#logout"

  post "/reset", to: "passwords#reset"


  post "/artist_signup", to: "artists#create"
  get "/artist_me", to: "artists#show"

  post "/artist_login", to: "sessions#artist_login"
  delete "/artist_logout", to: "sessions#artist_logout"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
