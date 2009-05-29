class User < ActiveRecord::Base

	has_many :hours
	has_many :activities, :through => :hours
  
  acts_as_authentic do |c|
    c.validate_password_field = false
  end
  	
	protected
    
	def valid_ldap_credentials?(password_plaintext)
    	# ldap = Net::LDAP.new
    	# ldap.host = "10.1.0.51" 
    	# ldap.auth "LUGANO\\" + self.username, password_plaintext
    	# ldap.bind
    	true
  end
	
end
