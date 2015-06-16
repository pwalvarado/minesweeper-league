class Api::TwoPlayerGamesController < ApplicationController

  def new
    game_id = SecureRandom.urlsafe_base64
    @two_player_game = TwoPlayerGame.new({ game_id: game_id })

    @two_player_game.save
    render json: @two_player_game
  end

end
