class User < ActiveRecord::Base
	
	validates :email, presence: true, uniqueness: true
	validates :name, presence: true

	has_many :saves, dependent: :destroy
	has_many :items, dependent: :destroy
    has_many :globals, through: :connections
	has_many :connections, dependent: :destroy







	has_secure_password
	 

# ---------------------------------------------

  def generate_password_reset_token!
    update(password_reset_token: SecureRandom.urlsafe_base64(48))
  end

# ---------------------------------------------

end
