# [Fighting-Game](https://datamaverik.github.io/Fighting-Game/)

## Overview

This project is a simple fighting game developed to strengthen my understanding of how the HTML5 Canvas API works. The game involves two fighters controlled by different players, with basic movements and attack mechanics. The aim was to create an engaging and functional game while gaining hands-on experience with canvas-based animations and game logic.

## How the Game Works

The game features two players, each with their own set of controls. The players can move left, right, jump, and perform attacks. There is also a special attack mechanic that triggers with a 1/4 chance, dealing significantly more damage than a regular attack. The game continues until one player's health is depleted or the timer runs out, at which point the player with more health is declared the winner.

## Controls

### Player 1

- Move Left: 'A'
- Move Right: 'D'
- Jump: 'W'
- Attack; 'S'
- There's a 1/4 chance that the attack could be a special attack, dealing 4 times more damage than a regular attack.

### Player 2

- Move Left: 'ArrowLeft'
- Move Right: 'ArrowRight'
- Jump: 'ArrowUp'
- Attack; 'ArrowDown'
- Similar to Player 1, there is a 1/4 chance that the attack could be a special attack, dealing 4 times more damage than a regular attack.

## Features

- **Two Player Controls:** Each player can independently move, jump, and attack.
- **Health Meters:** Each player has a health meter displayed at the top of the screen.
- **Timer:** A timer counts down the duration of the game.
- **Special Attacks:** A 1/4 chance of triggering a special attack that deals 4 times the damage.
- **Game Over Logic:** The game determines the winner based on health levels or time remaining.
- **Animations:** Smooth animations for movement, jumping, attacking, and special attacks.
- **Sound Effects:** Includes sounds for actions like fighting and game over.

## How to Play

1. Open the game in your browser by clicking on the Title.
2. Click the "Play" button to start the game.
3. Use the controls specified above to move your character and attack your opponent.
4. The game ends when one player's health is depleted or the timer runs out.
5. The winner is displayed based on who has more health at the end or who depletes the opponent's health first.
6. Click "Restart" to play again.

## Technical Details

This game was developed using vanilla JavaScript, HTML, and CSS. The game logic, animations, and interactions are handled through JavaScript, utilizing the Canvas API for rendering graphics and handling animations.
