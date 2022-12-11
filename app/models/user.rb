class User < ApplicationRecord
    has_many :rents
    has_many :arts, through: :rents
    has_many :reviews
    has_many :arts, through: :reviews
    has_secure_password
    # validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
end
