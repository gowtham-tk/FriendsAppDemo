require "test_helper"

class FriendsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @token = JsonWebToken.encode(user_id: @user.id)
    @friend = friends(:one)
  end

  test "should get index" do
    get friends_path, 
        headers: { 'Authorization' => "Bearer #{@token}" },
        as: :json
    assert_response :success
  end

  test "should create friend" do
    assert_difference("Friend.count") do
      post friends_url, 
           params: { friend: { 
             dob: @friend.dob, 
             email: @friend.email, 
             first_name: @friend.first_name, 
             last_name: @friend.last_name, 
             phone: @friend.phone, 
             user_id: @friend.user_id, 
             wished: @friend.wished 
           } }, 
           headers: { 'Authorization' => "Bearer #{@token}" },
           as: :json
    end
    assert_response :created
  end

  test "should show friend" do
    get friend_url(@friend),
        headers: { 'Authorization' => "Bearer #{@token}" },
        as: :json
    assert_response :success
  end

  test "should update friend" do
    patch friend_url(@friend), 
          params: { friend: { 
            dob: @friend.dob, 
            email: @friend.email, 
            first_name: @friend.first_name, 
            last_name: @friend.last_name, 
            phone: @friend.phone, 
            user_id: @friend.user_id, 
            wished: @friend.wished 
          } },
          headers: { 'Authorization' => "Bearer #{@token}" },
          as: :json
    assert_response :success
  end

  test "should destroy friend" do
    assert_difference("Friend.count", -1) do
      delete friend_url(@friend), 
             headers: { 'Authorization' => "Bearer #{@token}" },
             as: :json
    end
    assert_response :no_content
  end
end