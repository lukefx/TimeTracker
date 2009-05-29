class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :persistence_token      
      t.integer   :login_count, :null => false, :default => 0
      
      t.timestamps
    end
  end

  def self.down
    drop_table :users
  end
end
