require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

#  test "should get index" do
#    get users_url, as: :json
#    assert_response :success
#  end


test "should create user" do
  assert_difference("User.count", 1) do
    post users_url, 
         params: { 
           user: { 
             email: "new@example.com",
             password: '123456',
             password_confirmation: '123456'
           } 
         },
         headers: { 'Content-Type' => 'application/json' },
         as: :json
    #puts response.body
  end
  assert_response :success
end

#  test "should show user" do
#    get user_path(@user), as: :json
#    assert_response :success
#  end

#  test "should update user" do
#    patch user_path(@user), params: { user: { email: @user.email, password: @user.password } }, as: :json
#    assert_response :success
#  end

#  test "should destroy user" do
#    assert_difference("User.count", -1) do
#      delete user_path(@user), as: :json
#    end

#    assert_response :no_content
#  end
end
