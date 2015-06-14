class ExpertLeader < ActiveRecord::Base

  validates :name, :time, presence: true

end
