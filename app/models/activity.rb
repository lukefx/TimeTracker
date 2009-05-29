class Activity < ActiveRecord::Base

	has_many :hours
	has_many :users, :through => :hours

	acts_as_taggable

end
