# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper

	def date_id(d)
		d.strftime("%d_%m_%Y")
	end

	def html_list(type, elements, options = {})
		if elements.empty?
			""
		else
			lis = elements.map { |x| content_tag("li", x) }
			content_tag(type, lis, options)
		end
	end

	def ul(*args)
		html_list("ul", *args)
	end

	def ol(*args)
		html_list("ol", *args)
	end	

end
