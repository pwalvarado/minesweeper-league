class Api::Leaders::BeginnerLeadersController < ApplicationController

  def index
    @beginner_leaders = BeginnerLeader.all

    render json: @beginner_leaders
  end

end
