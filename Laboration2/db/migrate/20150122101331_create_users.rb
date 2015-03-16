class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, :limit => 25, unique:true
      t.string :password, :limit => 60
      t.string :key, unique:true
      t.boolean :admin, default: false
      t.timestamps
    end
  end
end
