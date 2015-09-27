class ItemsController < ApplicationController

before_action :set_user, except: [:edit, :getglobal]
before_action :set_item, only: [:destroy]
before_action :confirm_logged_in, except: [:getglobal]
before_action :ensure_correct_user, only: [:saveit]

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
    render json: @item, status: :ok

  end


# --------------------------------------------------
  
  # DELETE LAST SAVE
  def lastsave

  @user.total_savings -= @user.keeps.last.price
  @user.keeps.last.destroy

if @user.save
  render json: @user, status: :ok
end
  end


# --------------------------------------------------

def saveit

@save = Keep.new 
@global_save = Global.new

@save.item_name = params[:name]
@global_save.item_name = params[:name]

@save.category = params[:category]
@global_save.category = params[:category]

@save.price = params[:price]
@global_save.price = params[:price]

@save.date_saved = Time.now
@global_save.date_added = Time.now

@save.user_id = @user.id
@global_save.user_id = @user.id

@user.total_savings += params[:price]
@global_save.user_name = @user.name
@global_save.user_picture = @user.picture
@global_save.save 
@user.globals << @global_save

   if @save.save && @user.save
   
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

# Maps over the user's saves and stores the ones from this
# month in the "thismonth" array....
@saves.each do |save|

if save.date_saved.month === @today.month && save.date_saved.year === @today.year

 @thismonth.push(save)
 @user.month_savings += save.price 

end
end

@month_cat = {}

# Maps the current month's savings data into an object....

for i in 0...@thismonth.length
  
  cat = @thismonth[i].category

if @month_cat[cat]
  @month_cat[cat] += @thismonth[i].price 
else
  @month_cat[cat] = @thismonth[i].price
end
end

    @user.save

# Accessing global data via methods on the Global Model
@globals = Global.all
@global_total = Global.total_savings(@globals)
@global_month_savings = Global.month_savings(@globals)  
@global_month_totals = Global.month_totals(@global_month_savings) 

# render json: @saves, status: :ok
  render json: {:saves => @saves, 
    :user => @user, 
    :thisMonth => @thismonth,
    :monthCat => @month_cat,
    :global => @globals,
    :globalTotal => @global_total,
    :globalMonth => @global_month_savings,
    :globalMonthTotal => @global_month_totals}, 
  status: :ok

end
# --------------------------------------------- 

def getglobal
  
# Accessing global data via methods on the Global Model
@globals = Global.all
@global_total = Global.total_savings(@globals)
@global_month_savings = Global.month_savings(@globals)  
@global_month_totals = Global.month_totals(@global_month_savings) 

# render json: @saves, status: :ok
  render json: {
    :global => @globals,
    :globalTotal => @global_total,
    :globalMonth => @global_month_savings,
    :globalMonthTotal => @global_month_totals}, 
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

def ensure_correct_user
      user = User.find params[:user_id]
      unless user.id.to_i == current_user.id
        redirect_to root_path, alert: "Not Authorized"
      end
end

end
