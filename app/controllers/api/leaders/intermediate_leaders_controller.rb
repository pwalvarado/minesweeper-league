class Api::Leaders::IntermediateLeadersController < ApplicationController

  def index
    @intermediate_leaders = IntermediateLeader.all

    render json: @intermediate_leaders
  end

  def create
    @intermediate_leader = IntermediateLeader.new(intermediate_leader_params)

    if @intermediate_leader.save
      render json: @intermediate_leader
    else
      flash.now[:errors] = @intermediate_leader.errors.full_messages

      render json: flash.now[:errors]
    end
  end

  private

    def intermediate_leader_params
      params.require(:leader).permit(:user_id, :name, :time)
    end

end
