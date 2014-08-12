require "sinatra"
require "sinatra/activerecord"
require "slim"

set :database, "sqlite3:flashquiz.db"

class Card < ActiveRecord::Base
end

get "/" do
  slim :"app.html"
end

get "/edit" do
  slim :"edit.html"
end

get "/cards.json" do
  content_type :json

  @cards = Card.order("created_at DESC")
  @cards.to_json
end

