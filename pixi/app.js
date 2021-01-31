const { Rectangle } = require('pixi.js');

window.WebFontConfig = {
	google: {
		families: ['Roboto Mono', 'Open Sans'],
	},
};

/* eslint-disable */
// include the web-font loader script
(function () {
	const wf = document.createElement('script');
	wf.src = `${
		document.location.protocol === 'https:' ? 'https' : 'http'
	}://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
	wf.type = 'text/javascript';
	wf.async = 'true';
	const s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();
/* eslint-enabled */
const app = new PIXI.Application({
	transparent: true,
	width: (window.innerWidth / 3) * 2,
	height: window.innerHeight - 100,
});
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);

function setup() {
	// Map keys to actions
	let left = keyboard('ArrowLeft'),
		up = keyboard('ArrowUp'),
		right = keyboard('ArrowRight'),
		down = keyboard('ArrowDown'),
		space = keyboard(' ' || 'Spacebar');

	//Left arrow key `press` method
	left.press = () => {};

	//Up
	up.press = () => {};

	//Right
	right.press = () => {};

	//Down
	down.press = () => {};
	//spacebar
	space.press = () => {};
	space.release = () => {};

	//Set the game state
	state = play;

	//Start the game loop
	app.ticker.add((delta) => {
		gameLoop(delta);
	});
}
function onClick(object) {
	object.tint = 0x777ec7;
	reset();
}
function gameLoop(delta) {
	//Update the current game state:
	state(delta);
}

function play(delta) {
	//checks for changes
}

//keyboard events
function keyboard(value) {
	let key = {};
	key.value = value;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	//The `downHandler`
	key.downHandler = (event) => {
		if (event.key === key.value) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
			event.preventDefault();
		}
	};

	//The `upHandler`
	key.upHandler = (event) => {
		if (event.key === key.value) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
			event.preventDefault();
		}
	};

	//Attach event listeners
	const downListener = key.downHandler.bind(key);
	const upListener = key.upHandler.bind(key);

	window.addEventListener('keydown', downListener, false);
	window.addEventListener('keyup', upListener, false);

	// Detach event listeners
	key.unsubscribe = () => {
		window.removeEventListener('keydown', downListener);
		window.removeEventListener('keyup', upListener);
	};

	return key;
}
