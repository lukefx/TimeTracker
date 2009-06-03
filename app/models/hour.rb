class Hour < ActiveRecord::Base

	belongs_to :user
	belongs_to :activity

	def day_formatted
		self.day.strftime("%d.%m.%Y")
	end

end
