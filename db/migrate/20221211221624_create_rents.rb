class CreateRents < ActiveRecord::Migration[6.1]
  def change
    create_table :rents do |t|
      t.date :start
      t.date :end
      t.integer :price
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :art, null: false, foreign_key: true

      t.timestamps
    end
  end
end
