class IntermediateLeader < ActiveRecord::Base

  validates :name, :time, presence: true

end
