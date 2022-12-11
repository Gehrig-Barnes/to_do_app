class RentSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :price
  has_one :user
  has_one :art
end
