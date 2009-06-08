class HoursController < ApplicationController

	before_filter :require_user, :set_user

	def index

		if params[:date]
			session[:date] = Date.parse(params[:date])
		end

		respond_to do |format|
      format.html # index.html.erb
      format.js
    end
	end

	def show

		@date = session[:date] = Date.parse(params[:date])
		@hours = Hour.find(:all, :conditions => ["user_id=? and day=?", @user.id, @date])

    respond_to do |format|
      format.html # show.html.erb
      format.js
      format.xml  { render :xml => @hours }
    end
  end

  def create

		@hour = Hour.new(params[:hour])

    if @hour.save
      flash[:notice] = "Hour successfully logged."
    else
      flash[:notice] = "Error on request"
		end

		respond_to do |format|
    	format.html { redirect_to hours_path }
			format.js
    end

  end

	private

	def set_user
		@user = current_user || User.find(session[:user_id])
	end


end
