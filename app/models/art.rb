class Art < ApplicationRecord
  belongs_to :artist
  has_many :rents
  has_many :users, through: :rents

  has_many :reviews
  has_many :users, through: :reviews
end
