class Global < ActiveRecord::Base
	has_many :users, through: :connections
	has_many :connections, dependent: :destroy

    validates :price, presence: true
	  validates :item_name, presence: true
    validates :category, presence: true
    validates :user_id, presence: true
    validates :user_name, presence: true

# --------------------------------------------------

 def self.total_savings(data) 	
  @total_savings = 0
  data.each do |save|
  @total_savings += save.price 
  end
  return @total_savings
 end

# --------------------------------------------------

 def self.month_savings(data) 
 @today = Date.today
 @thismonth = []
 data.each do |save|
if save.date_added.month === @today.month && save.date_added.year === @today.year
 @thismonth.push(save) 
end
end
  return @thismonth
 end

# --------------------------------------------------

 def self.month_totals(data)
    
 @month_cat = {}
 @month_cat[:total] = 0
# Maps the current month's savings data into an object....
for i in 0...data.length
  
  cat = data[i].category

if @month_cat[cat]
  @month_cat[cat] += data[i].price 
  @month_cat[:total] += data[i].price
else
  @month_cat[cat] = data[i].price
  @month_cat[:total] += data[i].price
end
end
  return @month_cat
 end

# --------------------------------------------------




end
