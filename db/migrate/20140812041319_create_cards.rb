class CreateCards < ActiveRecord::Migration
  def up
    create_table :cards do |t|
      t.string :question
      t.text :answer
      t.timestamps
    end
  end
 
  def down
    drop_table :cards
  end
end
