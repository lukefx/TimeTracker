class HoursController < ApplicationController

	before_filter :require_user

	def index

		if params[:date]
			session[:date] = Date.parse(params[:date])
		end

		if session[:date].nil?
			@date = Date.today
		else
			@date = session[:date]
		end

		respond_to do |format|
      format.html # index.html.erb
      format.js
    end
	end

	def show

	  @hours = Hour.find_by_day(params[:date]).to_a
		
    respond_to do |format|
      format.html # show.html.erb
      format.js
      format.xml  { render :xml => @hours }
    end
  end

end
