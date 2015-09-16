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
    
      

  if params[:email].present? && params[:password].present?
      @found_user = User.where(email: params[:email]).first
      # binding.pry
      if @found_user && @found_user.authenticate(params[:password])
        session[:user_id] = @found_user.id
        render json: @found_user, status: :created 
        # redirect_to user_path(current_user)
      else
        render json: @found_user.errors, status: :unprocessable_entity
        # flash[:alert] = "email / password combination is invalid"
        # redirect_to login_path(@user)
      end
    else
      render json: @found_user.errors, status: :unprocessable_entity
      # flash[:alert] = "please enter an email and password"
      # redirect_to login_path
    end




      
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
