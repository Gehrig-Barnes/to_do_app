class CreateArtists < ActiveRecord::Migration[6.1]
  def change
    create_table :artists do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :about
      t.string :image
      t.timestamps
    end
  end
end
