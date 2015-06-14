class DropLeadersCreateLeadersPerDifficulty < ActiveRecord::Migration
  def change
    drop_table :leaders

    create_table :beginner_leaders do |t|
      t.integer :user_id
      t.string :name, null: false
      t.integer :time, null: false

      t.timestamps null: false
    end

    create_table :intermediate_leaders do |t|
      t.integer :user_id
      t.string :name, null: false
      t.integer :time, null: false

      t.timestamps null: false
    end

    create_table :expert_leaders do |t|
      t.integer :user_id
      t.string :name, null: false
      t.integer :time, null: false

      t.timestamps null: false
    end

    add_index :beginner_leaders, :time
    add_index :intermediate_leaders, :time
    add_index :expert_leaders, :time
  end
end
