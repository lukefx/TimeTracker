# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_TimeTracker_session',
  :secret      => '0894bddc38d8841762f493d8c1c42d999da1b1486a40aa2995c607ea291f66b9175d37e4af1073faada208256f8a01193e20dd8ecacb27f4d02e04ec7e644d7a'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
