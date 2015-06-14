class BeginnerLeader < ActiveRecord::Base

  validates :name, :time, presence: true

end
