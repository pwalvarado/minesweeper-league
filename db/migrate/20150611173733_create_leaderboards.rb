class CreateLeaderboards < ActiveRecord::Migration
  def change
    create_table :leaderboards do |t|
      t.integer :user_id
      t.string :name, null: false
      t.integer :time, null: false

      t.timestamps null: false
    end

    add_index :leaderboards, :time

    change_column_null(:users, :username, false)
    change_column_null(:users, :password_digest, false)
    change_column_null(:users, :session_token, false)
  end
end
