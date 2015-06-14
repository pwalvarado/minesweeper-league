class Api::Leaders::ExpertLeadersController < ApplicationController

  def index
    @expert_leaders = ExpertLeader.all

    render json: @expert_leaders
  end

end
