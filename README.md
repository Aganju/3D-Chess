## 3D Chess

### Background

3D chess is a chess variation that was first seen on the show Star Trek,
there were no official rules for it but a few pioneers have seen fit to come
up with rulesets. This game shall implement this version of the rules: ![3D Chess tournament rules](http://meder.spacechess.org/3dschach/chess3d.htm)

### MVP

For this 3D Chess game, users will be able to:

- [ ] Choose color, Start game, Pick AI difficulty and forfeit
- [ ] A rudimentary AI
- [ ] Move pieces
- [ ] See possible moves on piece selection

In addition, this game will have:
- [ ] An about modal which will explain the rules
- [ ] A production README

### Wireframes

This application will have a single screen which has the game board and a sidebar menu
which opens to give the user the rules and an option to change the AI difficulty.
At the top of the page will be a nav which links to Github and LinkedIn.

![wireframes](https://github.com/Aganju/3D-Chess/blob/master/docs/wireframe.jpg)

### Architecture and Technologies

This project will be implemented using the following libraries and Technologies in addition to the
entry file script

- `React.js`  for updating pieces and minimizing load
- `chessboard3.js` which is built on top of `three.js` for 3d rendering
- `Webpack` to bundle js files

### Implementation Timeline

**Day 1** Dive deep into the `chessboard3.js` and rebuild to render the 3d chess board
  goals for the day:
  - render a rudimentary 3d chessboard or switch to `three.js`
  - outline any dependencies that have to be modified to work with  new chessboard

**Day 2** Rebuild library dependencies to work with 3d chessboard
  goals for the day:
  - get basic piece placement active
  - get movable boards working

**Day 3** Implement 3d chess rules to work with new board
  goals for the day:
  - get pieces to move according to rules
  - get rudimentary ai to make moves

### Bonus features

This project is only getting started, with time, this project will grow to include:

- [ ] A 3 tiered difficulty AI based on predictive search
- [ ] Multiple implemented rulesets such as [here](http://www.chessvariants.com/3d.dir/startrek.html) and [here](https://sites.google.com/site/caroluschess/movies/star-trek/star-trek-3d-chess-rules)
- [ ] Live play using websockets
