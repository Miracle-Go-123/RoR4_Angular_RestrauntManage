class Item < ActiveRecord::Base
	
	belongs_to :user

    validates :price, presence: true
	validates :name, presence: true
    validates :category, presence: true

end
