Rails.application.routes.draw do

  root 'static_pages#root'

  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :new, :destroy]

  namespace :api, default: { format: :json } do
    namespace :leaders, default: {format: :json} do
      resources :beginner_leaders, only: [:index]
      resources :intermediate_leaders, only: [:index]
      resources :expert_leaders, only: [:index]
    end
  end
end
