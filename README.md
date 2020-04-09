# Basic Shopping Cart by Thomas Freeman

## Description

This is a simple online shopping application. With a hardcoded set of items for sale, a user can add items to their cart, enter into a checkout flow, and see past orders.

Features:
- Ability to shop a variety of items for sale and add them to a shopping cart
- Persistent data through an included mySQL database
- Ability to edit/change quantities of shopping cart items and remove them entirely if desired
- A checkout flow to place an order of the items in your cart
- View past orders and details of that order

Stack:
- ExpressJS (nodeJS) server
- React Frontend
- mySQL database
- Jest/Enzyme Testing
- 100% Dockerized 

### Installation (Assumes docker is installed)
1) Clone repo to a local folder
2) Navigate to that folder
3) `docker-compose build`
4) `docker-compose up`
5) Visit http://localhost:3000/

### Testing
1) Navigate to the repo
2) `cd client`
3) `npm test`

## Dev Notes
This was by far the most in depth technical challenge I have run into so far for an interview. While the initial requirements are simple enough, 
pulling all of the technologies together proved to be a rewarding learning experience. This was primarily due to the fact that I have never used 
Docker before nor kick started a db-connected web app from scratch. That being said, I really enjoyed myself and am happy to have this project in my personal repo for any future endeavors.
While I certainly do not consider this a finished project by any means, I think it is in a decent place to showcase its features and the viability to the stack underlying them.

When I first started thinking about what stack I wanted to develop this with (keeping in mind the project requirements of front/back/db layers) I quickly decided on using ReactJS for the front end.
This was mainly due to my wanting to brush up on my react skills after having not touched React for over a year. Although I would not use all of the tooling, kickstarting the project via
Create React App allied for an easy setup with included testing and a large community to backend my effects with.

The backend I decided to keep simple and go with an ExpressJS instance as I have used it before and knew my backend was going to be a glorified ORM with an exposed API. 

For the database, I had used mariaDB before and thus MYSQL seemed like an obvious choice as a relational database is perfectly suited for this projects needs.

## Lessons Learned and things I would have done differently
While I had used React, Node, and MySQL before, using Docker was very foreign to me. I understood some of the more basic concepts behind it, but the actual implementation was something I had never
approached, either professionally or personally. 

I certainty would not call setting up Docker 'easy.' My Initial troubles came about when I learned that Docker Desktop does not support Windows 10 home which my Desktop runs. 

With some quick Googling' I was able to determine that I could route Docker through a Linux-based VM hosted on my desktop and thus I was off. Still, learning to develop with Docker 
in mind changed a few of my habits and challenged my current understanding of software engineering. I love that. This project was able to challenge me in novel ways and I am very blessed and 
appreciative of that opportunity.

## Future Work
- Search for shopping items
- Categories for Items
- Loading screens while API is called
- Save for later
 
## Known bugs
1) I am not sure why this happens, but every once in a while after starting the project with `docker-compose up` the database connection will be refused and no data will be served to the front end. However,
restarting the docker application clears this up 90% of the time and the data is served as expected.
2) Removing an item from the user's cart seems to mess up the CSS on the page, though it does not break any functionality.
