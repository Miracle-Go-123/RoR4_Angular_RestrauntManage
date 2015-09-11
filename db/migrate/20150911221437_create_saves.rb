class CreateSaves < ActiveRecord::Migration
  def change
    create_table :saves do |t|
      t.string :item_name
      t.string :category
      t.integer :price
      t.datetime :date_saved
      t.text :message
      t.string :user_id

      t.timestamps null: false
    end
  end
end
