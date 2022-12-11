class ArtSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :rented
  has_one :artist
end
