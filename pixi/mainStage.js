const { Sprite } = require('pixi.js');
const PIXI = require('pixi.js');

export const app = new PIXI.Application({
  transparent: false,
  resizeTo: window,
});

app.renderer.backgroundColor = 0xb694e4;
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);

let appWidth = app.renderer.view.width;
let appHeight = app.renderer.view.height;

window.addEventListener('resize', resize);

const scales = {
  1800: 1.2,
  1600: 1,
  1500: 0.9,
};

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  if (window.innerWidth < 1500) {
    app.stage.children.forEach((child) => {
      child.scale.x = scales[1500];
    });
  } else if (window.innerWidth < 1800) {
    app.stage.children.forEach((child) => {
      child.scale.x = scales[1600];
    });
  } else {
    app.stage.children.forEach((child) => {
      child.scale.x = scales[1800];
    });
  }
}
resize();
// let left = keyboard('ArrowLeft'),
//   up = keyboard('ArrowUp'),
//   right = keyboard('ArrowRight'),
//   down = keyboard('ArrowDown'),
//   space = keyboard(' ' || 'Spacebar');

// //Left arrow key `press` method
// left.press = () => {
//   if (app.stage.pivot.x >= window.innerWidth) {
//     app.stage.pivot.x -= window.innerWidth;
//   }
// };
// //Up
// up.press = () => {};
// //Right
// right.press = () => {
//   if (app.stage.pivot.x <= window.innerWidth * 2) {
//     app.stage.pivot.x += window.innerWidth;
//   }
// };

// function keyboard(value) {
//   let key = {};
//   key.value = value;
//   key.isDown = false;
//   key.isUp = true;
//   key.press = undefined;
//   key.release = undefined;
//   //The `downHandler`
//   key.downHandler = (event) => {
//     if (event.key === key.value) {
//       if (key.isUp && key.press) key.press();
//       key.isDown = true;
//       key.isUp = false;
//       event.preventDefault();
//     }
//   };

//   //The `upHandler`
//   key.upHandler = (event) => {
//     if (event.key === key.value) {
//       if (key.isDown && key.release) key.release();
//       key.isDown = false;
//       key.isUp = true;
//       event.preventDefault();
//     }
//   };

//   //Attach event listeners
//   const downListener = key.downHandler.bind(key);
//   const upListener = key.upHandler.bind(key);

//   window.addEventListener('keydown', downListener, false);
//   window.addEventListener('keyup', upListener, false);

//   // Detach event listeners
//   key.unsubscribe = () => {
//     window.removeEventListener('keydown', downListener);
//     window.removeEventListener('keyup', upListener);
//   };

//   return key;
// }

//place to put background colors/textures

//define scale

//create sprite function
// function createSprite(x, y, texture, type) {
// 	const sprite = new Sprite(texture);
// 	app.stage.addChild(sprite);
// 	sprite.anchor.set(0.5);
// 	sprite.position.x = x;
// 	sprite.position.y = y;
// 	if (type === 'desk') {
// 		sprite.scale.set(scale.desk);
// 	} else {
// 		sprite.scale.set(scale.projects);
// 		sprite.interactive = true;
// 		sprite.buttonMode = true;
// 	}
// 	return sprite;
// }

//place to define pixi textures and create sprites

//place to add event handlers

//place to connect sprites/shapes created in react components

//e.g.
// export let popUps = new PIXI.Container();
// app.stage.addChild(popUps);

/** Pop Ups**/

export let projectContainer = new PIXI.Container();
app.stage.addChild(projectContainer);
