class Artist < ApplicationRecord
    has_many :arts
    has_secure_password
    validates :email, presence: true, uniqueness: true
    # validates :username, presence: true, uniqueness: true
    
  end
  