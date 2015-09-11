class CreateGlobals < ActiveRecord::Migration
  def change
    create_table :globals do |t|
      t.string :user_name
      t.string :user_picture
      t.string :category
      t.string :item_name
      t.datetime :date_added
      t.integer :price
      t.integer :points
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
