# Minesweeper League
[heroku link]

## Minimum Viable Product
Minesweeper League is a website devoted to minesweeper. Users can:

* Create accounts that do not require email verification.
* Create sessions (log in).
* Play as guest if they do not have or want an account.
* Play the original (single player) minesweeper.
* Play a 1v1 competitive variant of minesweeper.
* View the leaderboards for a given difficulty and variant.

## Design Docs
* View Wireframs
* DB schema

## Implementation Timeline

### Phase 1: User Authentication, Original Minesweeper (~2 days)
I will set up user authentication via Rails and build single player, client-side,
JS minesweeper. The most important thing at the end of P1 is a working minesweeper
 game pushed to Heroku where users can optionally log in to play.

### Phase 2: Original Minesweeper Leaderboard (~1 day)
I will set up a leaderboard. It will be backbone.js linked in the nav bar
and show a pop up with a scrollable list of the "Top N Best Times".
Users and guests can type in any name they want if they qualify. Logged in users
will have their username pre-filled on the best-time pop-up. I will have a
listener for a finished game that queries the database to find if the time
qualifies, and if so where in the list to place it. I will then delete to previous
least time if it exceeds the list.

### Phase 3: Static Competitive Minesweeper (~3 days)
Though this is not my final hope for a competitive minesweeper variant, I will
build a static version where each player is given the an identical board and
they race to finish first. The most important thing in this phase is that the
players can see both boards in real time. My naive presumption is that
I will have client-side backbone.js event listeners attached to web socket
message transmissions, updating the DOM for each client. At the moment I know
next to nothing about web sockets, or whether or not there's a better approach.
I've looked into some web socket gems ([pusher](https://pusher.com/),
[socky][https://github.com/socky/socky-server-ruby],
[EM-WebSocket](https://github.com/igrigorik/em-websocket) and
[websocket-rails](https://github.com/websocket-rails/websocket-rails)) but I'd
greatly appreciate advice here on how best to move forward.

### Phase 4: Two Player Invitation System (~3 days)
I will set up an invitation system inspired by the "Play with a friend"
[lichess](lichess.org) functionality, where a user can share a unique,
auto-generated url with another person that, when clicked, has them join the
game as the opponent.  

### Bonus Features:
* Open matchmaking,like [lichess](lichess.org).
* Profile page with personal best times for single player mode.
* A dynamic competitive Minesweeper (CM): the better you do, the harder it gets
for your opponent.
* A messaging/inbox system for private correspondence between users.
* A chat section in the competitive variant.
* A rematch button in the competitive variant.
* Opt-In email verification (like [lichess](lichess.org)).
* CM vs AI (non-trivial for dynamic boards).
* ELO ranking system for CM.
* Customizability options for all variants.
* Never-ending board variant.
* Never Guess variant (you can't lose if you play perfectly).
