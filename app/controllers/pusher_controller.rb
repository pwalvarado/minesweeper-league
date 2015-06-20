class PusherController < ApplicationController
  protect_from_forgery :except => :auth

  def auth
    if current_user
      response = Pusher[params[:channel_name]].authenticate(params[:socket_id],
        { :user_id => current_user.id })

      render :json => response
    else # Let guests use it too
      response = Pusher[params[:channel_name]].authenticate(params[:socket_id],
        { :user_id => SecureRandom.urlsafe_base64 })

      render :json => response
    end
  end
end
