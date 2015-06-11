class CreateTodoLists < ActiveRecord::Migration
  def change
    create_table :todo_lists do |t|
      t.text :list
      t.boolean :completed

      t.timestamps
    end
  end
end
