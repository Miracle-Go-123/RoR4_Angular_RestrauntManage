class ResetsController < ApplicationController


# ---------------------------------------------

  def create

    @user = User.find_by(email: params[:email])
    

    if @user
      @user.generate_password_reset_token!
    
      # Destroys any tokens that might already exist
      # This is also where you might user a background job
      # for later/timed messages.
      Reset.password_reset(@user).deliver_now
        render json: @user, status: :created
      # redirect_to login_path, notice: "Email sent"
    else
      # flash.now[:alert] = "Email not found"
      # render :new
        render json: @user.errors, status: :unprocessable_entity
    end
  end

# ---------------------------------------------

  def edit

    @user = User.find_by(password_reset_token: params[:id])
    
    if @user
      render "resets/edit", :layout => false
    else
      flash[:notice] = "Invalid reset token!"
      render "resets/edit", :layout => false
    end
  end

# ---------------------------------------------

  def update
    @user = User.find_by(password_reset_token: params[:id])

    if user_params[:password] === ""
      flash.now[:notice] = "Your new password can't be blank!"
      render "resets/edit", :layout => false 

    elsif @user && @user.update(user_params)
      @user.update(password_reset_token: nil)
      session[:user_id] = @user.id
      # flash[:success] = "Password updated!"
      redirect_to root_path
    else
      flash.now[:notice] = "Password reset token not found."
      render "resets/edit", :layout => false
    end
  end

# ---------------------------------------------

  private

  def user_params
    params.require(:user).permit(:password)
  end

end