class User < ActiveRecord::Base
	has_many :saves, dependent: :destroy
	has_many :items, dependent: :destroy
    has_many :globals, through: :connections
	has_many :connections, dependent: :destroy
end
