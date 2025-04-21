class ApplicationController < ActionController::API
    before_action :authenticate_request
  
    def authenticate_request
      header = request.headers['Authorization']
      token = header.split.last if header
      decoded = JsonWebToken.decode(token)
  
      if decoded
        @current_user = User.find_by(id: decoded[:user_id])
      else
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end

    def current_user
      @current_user
    end
  end
  
