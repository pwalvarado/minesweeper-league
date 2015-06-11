module Api
  class LeadersController < ApiController

    def index
      @leaders = Leader.all

      render json: @leaders
    end

  end
end
