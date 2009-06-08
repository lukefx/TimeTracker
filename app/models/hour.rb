class Hour < ActiveRecord::Base

	belongs_to :user
	belongs_to :activity

	def day_formatted
		self.day.strftime("%d.%m.%Y")
	end

	def self.hours_of_day(user_id, date)
		self.find(:all, :conditions => ["user_id=? and day=?", user_id, date])
	end

end
