class Api::Leaders::BeginnerLeadersController < ApplicationController

  def index
    @beginner_leaders = BeginnerLeader.all

    render json: @beginner_leaders
  end

  def create
    @beginner_leader = BeginnerLeader.new(beginner_leader_params)

    if @beginner_leader.save
      render json: @beginner_leader
    else
      flash.now[:errors] = @beginner_leader.errors.full_messages

      render json: flash.now[:errors]
    end
  end

  private

    def beginner_leader_params
      params.require(:leader).permit(:user_id, :name, :time)
    end

end
