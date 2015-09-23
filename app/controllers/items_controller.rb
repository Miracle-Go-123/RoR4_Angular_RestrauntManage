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
      @item.picture = "assets/food.png"
      elsif params[:category] === "drinks"
      @item.picture = "assets/drinks.png" 
      elsif params[:category] === "travel"
      @item.picture = "assets/transport.png"
      elsif params[:category] === "entertainment"
      @item.picture = "assets/entertainment.png"
      elsif params[:category] === "tea"
      @item.picture = "assets/coffee_tea.png"
      elsif params[:category] === "coffee"
      @item.picture = "assets/coffee_tea.png"
      elsif params[:category] === "clothing"
      @item.picture = "assets/clothing.png"
      else 
      @item.picture = "assets/other.png"
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
@user.total_savings += params[:price]
  
   if @save.save && @user.save
    # @saves = @user.keeps
    # render json: {:saves => @saves, :user => @user}, status: :created  
    render json: @save, status: :created  
    else
    
    render json: @save.errors, status: :unprocessable_entity
     
   end
  
end


# --------------------------------------------- 

def getsaves

# Try to make a better set of queries to the DB

 @saves = @user.keeps
 
 @today = Date.today
 @thismonth = []

 @user.month_savings = 0

@saves.each do |save|

if save.date_saved.month === @today.month && save.date_saved.year === @today.year

 @thismonth.push(save)
 @user.month_savings += save.price 

end
end

    @user.save
    # binding.pry
    # render json: @saves, status: :ok
  render json: {:saves => @saves, :user => @user, :thisMonth => @thismonth}, 
  status: :ok

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
