class CreateFriends < ActiveRecord::Migration[8.0]
  def change
    create_table :friends do |t|
      t.string :first_name
      t.string :last_name
      t.date :dob
      t.string :phone
      t.string :email
      t.boolean :wished
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
