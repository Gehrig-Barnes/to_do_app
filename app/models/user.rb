class User < ApplicationRecord
    has_many :tasks
    has_many :completed
    has_secure_password
    validates :username, presence: true, uniqueness: true
end
