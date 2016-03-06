# Dotr

Is your significant other's love language "receiving gifts?"

Mine is. 

Dotr is a fun little app, built in NodeJS and Material AngularJS, to help keep track of gifts you can give.

## Installation
`npm install` in both client and server directories  
`cd server`  
`cp start.sh.example start.sh`  
Replace variables in start.sh with your google custom search tokens  
`bash start.sh`  

## Roadmap
#### Pressing needs
General refactoring and improvements:
* get rid of modals for editing
* ~~improve mobile experience with floating action button~~
* ~~add "About" page~~
* add more item functionality:
  * a user should be able to input a link of an item they are considering. It should be easily clickable.
  * Maybe search that page for a display image?
  * They should also be able to put in a short description
* Do things the Angular Way:
  * Refactor api calls to use some kind of restful library using a service.
  * Abstract out controller code as much as possible into a factory. Lots of code there is shared.

#### 10000" View
* Make Dotr be a multiuser type app. Each user gets their own set of categories/subcategories/items.
* Move to Redis to support a bit more scalability. Also for just learning and education reasons.
* Add ability for a user to "share" a link to an item with an anonymous user. Most likely, we'll just be able to generate a public link to an item that the user can copy and paste somewhere else.

##### End Goal
1. Build Dotr
2. .....something
3. Profit (through affiliate sales and targeted advertising)
