require "sinatra"
require "slim"

get "/" do
  slim :"app.html"
end
