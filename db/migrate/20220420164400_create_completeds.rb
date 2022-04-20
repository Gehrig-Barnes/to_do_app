class CreateCompleteds < ActiveRecord::Migration[6.1]
  def change
    create_table :completeds do |t|
      t.string :title
      t.string :to_do
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
