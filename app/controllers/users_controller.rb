class UsersController < ApplicationController


 
# ---------------------------------------------

 def index
    
    @user = User.find @current_user.id
    render json: @user, status: :ok
 end

# ---------------------------------------------

  def create
    
    @user = User.create user_params
    
    if @user.save
    render json: @user, status: :created  
      session[:user_id] = @user.id
      
    else
    render json: @user.errors, status: :unprocessable_entity
     
    end
  end

# --------------------------------------------- 

  def login

  if params[:email].present? && params[:password].present?
      @found_user = User.where(email: params[:email]).first
  
      if @found_user && @found_user.authenticate(params[:password])
        session[:user_id] = @found_user.id
        render json: @found_user, status: :created 
       
      else
        render json: @found_user.errors, status: :unprocessable_entity
        # flash[:alert] = "email / password combination is invalid"
       
      end
    else
      render json: @found_user.errors, status: :unprocessable_entity   
  end
  end


# --------------------------------------------- 

























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
