class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating
  has_one :art
  has_one :user
end
