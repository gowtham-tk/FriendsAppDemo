class FriendsController < ApplicationController
  before_action :set_friend, only: %i[ show update destroy ]

  # GET /friends
  def index
    @friends = Friend.where(user_id: current_user.id)
    render json: @friends
  end

  # GET /friends/1
  def show
    render json: @friend
  end

  # POST /friends
  def create
    @friend = Friend.new(friend_params)

    if @friend.save
      render json: @friend, status: :created, location: @friend
    else
      render json: @friend.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /friends/1
  def update
    if @friend.update(friend_params)
      render json: @friend
    else
      render json: @friend.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friends/1
  def destroy
    @friend.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend
      @friend = Friend.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def friend_params
      params.expect(friend: [ :first_name, :last_name, :dob, :phone, :email, :wished, :user_id ])
    end
end
