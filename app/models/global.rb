class Global < ActiveRecord::Base
	has_many :users, through: :connections
	has_many :connections, dependent: :destroy
end
