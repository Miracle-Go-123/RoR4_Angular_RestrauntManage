class ItemsController < ApplicationController

before_action :set_user, except: [:edit]


# --------------------------------------------------

  # GET /items
  def index
    @items = @user.items
    render json: @items, status: :ok
  end

# ---------------------------------------------
  
  # POST /items
  def create
    
    @item = Item.create item_params
    @item.user_id = @user.id
    if @item.save
    

    render json: @item, status: :created  
  
    else
    
    render json: @item.errors, status: :unprocessable_entity
     
    end
  end

# --------------------------------------------- 































# --------------------------------------------- 

  private

def set_user

	@user = User.find @current_user.id
	
end

 def item_params
    params.require(:item).permit(
      :name,
      :price,
      :picture, 
      :category,
      :user_id
    )
 end

end
