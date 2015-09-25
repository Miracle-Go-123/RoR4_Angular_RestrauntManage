class Keep < ActiveRecord::Base
	belongs_to :user

	validates :price, presence: true
	validates :item_name, presence: true
    validates :category, presence: true
    validates :user_id, presence: true
    validates :date_saved, presence: true

end

