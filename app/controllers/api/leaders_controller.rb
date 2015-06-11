module Api
  class LeadersController < ApiController

    def index
      @leaders = Leaders.all

      render json: @leaders
    end

  end
end
