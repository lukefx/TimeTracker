module HoursHelper

	def today_class(d)
		if d.today?
			return "today"
		end
	end

end
