class Api::Leaders::ExpertLeadersController < ApplicationController

  def index
    @expert_leaders = ExpertLeader.all

    render json: @expert_leaders
  end

  def create
    @expert_leader = ExpertLeader.new(expert_leader_params)

    if @expert_leader.save
      render json: @expert_leader
    else
      flash.now[:errors] = @expert_leader.errors.full_messages

      render json: flash.now[:errors]
    end
  end

  private

    def expert_leader_params
      params.require(:leader).permit(:user_id, :name, :time)
    end

end
