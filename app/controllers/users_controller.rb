class UsersController < ApplicationController


 
# ---------------------------------------------

 def index
    # binding.pry
    @user = User.find @current_user.id
    render json: @user, status: :ok
 end

# ---------------------------------------------

  def create
    
    @user = User.create user_params
    
    if @user.save
    render json: @user, status: :created  
      session[:user_id] = @user.id
      # redirect_to user_path(@user)
    else
    render json: @user.errors, status: :unprocessable_entity
      # @landing_page = true
      # render "sessions/signup"
    end
  end

# --------------------------------------------- 


  def login
    
      binding.pry

      
  end




























# --------------------------------------------- 

  private



 def user_params
    params.require(:user).permit(
      :name,
      :password,
      :picture, 
      :email
    )
 end




end
