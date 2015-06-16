class CreateTwoPlayerGames < ActiveRecord::Migration
  def change
    create_table :two_player_games do |t|
      t.string :game_id, null: false

      t.timestamps null: false
    end
  end
end
