class UsersController < ApplicationController

before_action :confirm_logged_in, only: [:update, :destroy]
before_action :find_user, only: [:index, :update, :destroy]

 
# ---------------------------------------------

 def index
    
    render json: @user, status: :ok
 end

# ---------------------------------------------

  def create
    
    @user = User.create user_params
    @user.picture = params[:picture].sub("http", "https")
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


def update

  @user.name = user_params[:name]
  @user.picture = user_params[:picture]
  @user.email = user_params[:email]

if @user.save

  render json: @user, status: :created 

else

  render json: @user.errors, status: :unprocessable_entity

end

end


# --------------------------------------------- 


def destroy

@user.destroy
session[:user_id] = nil
    # flash[:notice] = "Account Deleted!"
    render json: @user, status: ok

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

def find_user
  @user = User.find @current_user.id
end

end
