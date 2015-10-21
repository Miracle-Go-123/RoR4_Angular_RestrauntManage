class ChangePriceDataTypeToDecimal < ActiveRecord::Migration
  def change
  	change_column :globals, :price, :decimal, :precision => 5, :scale => 2
  	change_column :keeps, :price, :decimal, :precision => 5, :scale => 2
  	change_column :users, :total_savings, :decimal, :precision => 12, :scale => 2, :default => 0
  	change_column :users, :month_savings, :decimal, :precision => 12, :scale => 2, :default => 0
  end
end
