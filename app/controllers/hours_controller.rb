class HoursController < ApplicationController

	before_filter :require_user
	
	def index
				
	  date = Date.strptime('31.05.2009', '%d.%m.%Y')
	  @hours = Hour.find_by_day(date).to_a
	  
	end
	
	def show
	  
	  @hours = Hour.find_by_day(params[:date]).to_a
	  
    respond_to do |format|
      format.html # show.html.erb
      format.js
      format.xml  { render :xml => @activity }
    end
  end
	
	def list
    puts params[:date]
  end

end
