Rails.application.routes.draw do

  root 'static_pages#root'

  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :new, :destroy]

  namespace :api, default: { format: :json } do
    resources :two_player_games, only: [:new]

    namespace :leaders, default: {format: :json} do
      resources :beginner_leaders, only: [:index, :create]
      resources :intermediate_leaders, only: [:index, :create]
      resources :expert_leaders, only: [:index, :create]
    end
  end
end
