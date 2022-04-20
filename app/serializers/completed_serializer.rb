class CompletedSerializer < ActiveModel::Serializer
  attributes :id, :title, :to_do
  has_one :user_id
end
