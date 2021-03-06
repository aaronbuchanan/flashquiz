require "sinatra"
require "sinatra/activerecord"
require "slim"

set :database, "sqlite3:flashquiz.db"

class Card < ActiveRecord::Base
end

class Highscore < ActiveRecord::Base
end


get "/" do
  slim :"app.html"
end

get "/edit" do
  slim :"edit.html"
end

get "/quiz" do
  slim :"quiz.html"
end

get "/results" do
  slim :"results.html"
end

get "/cards.json" do
  content_type :json

  @cards = Card.order("created_at DESC")
  @cards.to_json
end

post "/card" do
  @card = Card.new(
    question: params[:question],
    answer: params[:answer])
  @card.save
  redirect back
end

delete "/card" do
  @card = Card.find(params[:id]).destroy
  redirect back
end

post "/highscore" do
  content_type :json

  @json = JSON.parse(request.body.read)
  @score = Highscore.new(score: @json['score'])
  @score.save

  @high = Highscore.order('score DESC').first
  @high.to_json
end
