class Api::Leaders::IntermediateLeadersController < ApplicationController

  def index
    @intermediate_leaders = IntermediateLeader.all

    render json: @intermediate_leaders
  end

end
