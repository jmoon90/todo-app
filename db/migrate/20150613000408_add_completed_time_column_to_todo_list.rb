class AddCompletedTimeColumnToTodoList < ActiveRecord::Migration
  def change
    add_column :todo_lists, :completed_time, :string
  end
end
