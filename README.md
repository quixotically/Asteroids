# Asteroids 2P

[Live Demo](http://quixotically.github.io/Asteroids/)

## Description

Asteroids 2P is a local two-player version of the classic Asteroids arcade game.
Invite a person over to your computer and play! Controls are on the title menu.

## Languages and Dependencies

This project was written in JavaScript and jQuery, and the game is drawn on HTML5's `<canvas>` element. The [keymaster.js](https://github.com/madrobby/keymaster) library was used to check for key presses as well as to prevent default browser events on arrow key presses.

## Implementation details

### Trigonometry

One of the most difficult parts of this project was getting the ship to draw correctly. This is because there are trig calculations happening under the hood. To draw the ship, I converted polar coordinates to the cartesian plane around a non-zero origin. To add the ships' fire, I had to take the midpoints of the lines created by the midpoint of the ships' base side (opposite the tip). And, to keep track of which direction I was turned in, I saved the radians to an instance variable and used this in my drawing calculations.

### Key Presses

I used the `key.isPressed()` function from keymaster.js instead of its keybinding function, because the latter has trouble handling multiple key presses.

### Start and Game Over screens

I used jQuery to implement these. I add and remove the class "hidden" from the corresponding HTML section depending on what state the game is in. When the Play button is clicked, a new GameView is instantiated and started. And, if the game is replayed from the Game Over screen, the previous GameView is deleted before instantiating a new one. But before arriving at the Game Over screen, it's important to immediately `window.clearInterval(intervalID)` after losing all lives so that the game stops trying to `step()` and `draw()` itself.  

### Background

I created an animated background by populating the canvas with my Stardust objects (which were born out of the Bullet objects), giving them a constant velocity and random colors. Stardust objects are stored separately from `allObjects()` so that Game#checkCollisions does not iterate through them.

## Next steps

Enable friendly fire. Perhaps have health bars and/or obstacles that bullets can bounce off of, and not have asteroids at all. Add a single player "Practice" mode. Add different points depending on the size of the asteroid. Have enemies with AI.

## Thank you

To my fellow developer friends who gave feedback and suggestions, especially Nathan, Thomas J, and Paul! And you for visiting!
