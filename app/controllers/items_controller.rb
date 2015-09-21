class ItemsController < ApplicationController

before_action :set_user, except: [:edit]
before_action :set_item, only: [:destroy]


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
    # binding.pry
    if params[:category] === "food"
      @item.picture = "assets/Food-Sign.png"
      elsif params[:category] === "drinks"
      @item.picture = "assets/Drinks.png" 
      elsif params[:category] === "travel"
      @item.picture = "assets/Travel.png"
      elsif params[:category] === "entertainment"
      @item.picture = "assets/Entertainment.png"
      elsif params[:category] === "tea"
      @item.picture = "assets/Tea-Cup.png"
      elsif params[:category] === "coffee"
      @item.picture = "assets/Coffee-Mug.png"
      elsif params[:category] === "clothing"
      @item.picture = "assets/Clothing.png"
      else 
      @item.picture = "assets/Dollar.png"
    end

    @item.user_id = @user.id
    if @item.save
    

    render json: @item, status: :created  
  
    else
    
    render json: @item.errors, status: :unprocessable_entity
     
    end
  end

# --------------------------------------------- 


  # DELETE /items/:id
  def destroy
   
    @item.destroy
    render json: @item, status: ok

  end


# --------------------------------------------------


def saveit

@save = Keep.new 
@save.item_name = params[:name]
@save.category = params[:category]
@save.price = params[:price]
@save.date_saved = Time.now
@save.user_id = @user.id

   if @save.save

    render json: @save, status: :created  
  
    else
    
    render json: @save.errors, status: :unprocessable_entity
     
   end
  
end

















# --------------------------------------------- 

  private

def set_user

	@user = User.find @current_user.id
	
end

def set_item
      @item = Item.find(params[:id])
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
