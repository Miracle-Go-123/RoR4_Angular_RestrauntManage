class ChangeItemsPriceDataTypeToDecimal < ActiveRecord::Migration
  def change
  	change_column :items, :price, :decimal, :precision => 5, :scale => 2
  end
end
