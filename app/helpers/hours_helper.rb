module HoursHelper

	def today_class(d)
		if d.today?
			return "today"
		end
	end

	def selected_class(d)
		if d == session[:date]
			return "selected"
		end
	end


end
