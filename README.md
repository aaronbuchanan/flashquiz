flashquiz
=========

An (Work in progress) angular app with a quick and dirt ruby/sinatra backend that allows users to manage a set of flash cards and take a quiz with a time and accuracy based scoring mechanic.


PROGRESS:

[x] dev env setup (ruby+sinatra+sqlite3+active record)
[x] dev env readme
[x] server-side router
[x] db & active-record schema 
[x] spa setup (angular+bootstrap3)
[x] card list view
[x] adding/removing flashcards
[x] card quiz view
[x] quiz scoring mechanics
[x] highest quiz score
[ ] refactor & docs pass
[x] styling pass
[x] quiz progress feedback
[ ] deploy
[ ] docs review/fresh run


LOCAL DEVELOPMENT:

1. clone this repo
2. rvm should switch to 2.1.0
3. run `$ bundle install`
3. run `$ rake db:migrate`
4. run `$ shotgun`
