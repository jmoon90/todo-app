class TodoListsController < ApplicationController
  before_action :set_todo_list, only: [:show, :edit, :update, :destroy]
  before_filter :verified_request?, only: [:update, :edit, :destroy, :create]

  def index
    @todo_lists = TodoList.where(:completed => false)
  end

  def new
    @todo_list = TodoList.new
  end

  def create
    @todo_list = TodoList.new(todo_list_params)

    respond_to do |format|
      if @todo_list.save
        format.html {render json: TodoList.where(:completed => false).to_json}
      end
    end
  end

  def update
    respond_to do |format|
      if @todo_list.update!(todo_list_params)
        format.html {render json: [{:incomplete => TodoList.where(:completed => false), :complete => TodoList.where(:completed => true).reverse}].to_json}
      end
    end
  end

  def destroy
    @todo_list.destroy
    respond_to do |format|
      format.html { redirect_to todo_lists_url, notice: 'Todo list was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def todo_lists_json
    render json: [{:incomplete => TodoList.where(:completed => false), :complete => TodoList.where(:completed => true).reverse}].to_json
  end

  protected

    def verified_request?
      super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
    end

  private
    def set_todo_list
      @todo_list = TodoList.find(params[:id])
    end

    def todo_list_params
      params.require(:todo_list).permit(:list, :completed, :completed_time)
    end
end
