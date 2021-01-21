const { Sprite } = require('pixi.js');
const PIXI = require('pixi.js');
const Project = require('../client/MainView');
const About = require('../client/AboutMe');

const route = {
	'About Me': About,
};
const app = new PIXI.Application({
	transparent: false,
	resizeTo: window,
});

app.renderer.backgroundColor = 0xb694e4;
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);
export let stage = new PIXI.Container();

let ticker = PIXI.Ticker.shared;

ticker.autoStart = false;

ticker.start();
ticker.add(function (time) {
	app.renderer.render(stage);
});
let startclick;
const pinkFolder = PIXI.Texture.from('/siteAssets/welcome/PinkFolder.png');
let appWidth = app.renderer.view.width;
let appHeight = app.renderer.view.height;
export let aboutFolder = createItem(250, 400, pinkFolder, 'About Me');
function createItem(x, y, texture, name) {
	// create a sprite
	const item = new PIXI.Container();
	stage.addChild(item);
	// make sprite interactive
	item.interactive = true;
	// make hand appear on rollover
	item.buttonMode = true;
	// center anchor point
	// item.anchor.set(0.5);
	// setup events
	item
		// events for drag start
		.on('mousedown', onDragStart)
		.on('touchstart', onDragStart)
		// events for drag end
		.on('mouseup', onDragEnd)
		// .on('mouseupoutside', onDragEnd)
		.on('touchend', onDragEnd)
		// .on('touchendoutside', onDragEnd)
		// events for drag move
		.on('mousemove', onDragMove)
		.on('touchmove', onDragMove);

	// move the sprite to its designated position
	item.position.x = x;
	item.position.y = y;
	const content = new PIXI.Sprite(texture);
	item.addChild(content);
	content.anchor.set(0.5);

	const text = new PIXI.Text(name);
	item.addChild(text);
	return item;
}
function onDragStart(event) {
	// store a reference to the data
	// the reason for this is because of multitouch
	// we want to track the movement of this particular touch
	this.data = event.data;
	this.alpha = 0.5;
	this.dragging = true;
	startclick = this.data.getLocalPosition(this.parent);
}
function onDragEnd() {
	this.alpha = 1;
	this.dragging = false;
	const newPosition = this.data.getLocalPosition(this.parent);
	console.log(this.position, newPosition);
	if (
		Math.abs(newPosition.x - startclick.x) < 10 &&
		Math.abs(newPosition.y - startclick.y) < 10
	) {
		About.openLink();
		this.visible = false;
	}

	startclick = null;
	// set the interaction data to null
	this.data = null;
}

function onDragMove() {
	if (this.dragging) {
		const newPosition = this.data.getLocalPosition(this.parent);
		this.position.x = Math.max(0, newPosition.x);
		this.position.x = Math.min(this.position.x, appWidth);
		this.position.y = Math.max(0, newPosition.y);
		this.position.y = Math.min(newPosition.y, appHeight);
	}
}

let left = keyboard('ArrowLeft'),
	up = keyboard('ArrowUp'),
	right = keyboard('ArrowRight'),
	down = keyboard('ArrowDown'),
	space = keyboard(' ' || 'Spacebar');

//Left arrow key `press` method
left.press = () => {
	if (app.stage.pivot.x >= window.innerWidth) {
		app.stage.pivot.x -= window.innerWidth;
	}
};
//Up
up.press = () => {};
//Right
right.press = () => {
	if (app.stage.pivot.x <= window.innerWidth * 2) {
		app.stage.pivot.x += window.innerWidth;
	}
};

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
