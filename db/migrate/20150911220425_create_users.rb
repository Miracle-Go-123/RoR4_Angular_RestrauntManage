class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password
      t.string :picture
      t.integer :total_savings, :default => 0
      t.string :password_digest
      t.string :password_reset_token
      t.boolean :is_admin, :default => false
      t.string :provider
      t.string :uid
      t.string :oauth_token
      t.datetime :oauth_expires_at
      t.integer :points

      t.timestamps null: false
    end
  end
end
