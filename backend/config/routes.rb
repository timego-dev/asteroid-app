Rails.application.routes.draw do
  scope '/api/v1' do
    resources :neos
  end
end

Rails.application.routes.draw do
  get 'neos/index'
  get 'neos/create'
  get 'neos/update'
  get 'neos/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
