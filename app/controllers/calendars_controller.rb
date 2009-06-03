class CalendarsController < ApplicationController

	def index

		@date = session[:date] || Date.today

		respond_to do |format|
      format.html # index.html.erb
      format.js
    end
	end

	def show

		@date = Date.parse(params[:date])
		session[:date] = @date

		respond_to do |format|
      format.html # index.html.erb
      format.js
    end		
	end

end