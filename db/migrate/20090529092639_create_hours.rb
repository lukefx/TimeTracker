class CreateHours < ActiveRecord::Migration
  def self.up
    create_table :hours do |t|
			t.datetime :start_time
			t.datetime :stop_time
			t.date :day
			t.float :duration
			t.references :activity
			t.references :user
      t.timestamps
    end
  end

  def self.down
    drop_table :hours
  end
end
