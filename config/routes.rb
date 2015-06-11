Rails.application.routes.draw do
  root "todo_lists#index"
  resources :todo_lists do
    collection do
      get :todo_lists_json
    end
  end
end
