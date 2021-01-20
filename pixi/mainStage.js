const { Sprite, TilingSprite } = require('pixi.js');
const PIXI = require('pixi.js');
const Project = require('../client/MainView');

const app = new PIXI.Application({
	transparent: false,
	resizeTo: window,
});

app.renderer.backgroundColor = 0x090135;
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);

let appWidth = app.renderer.view.width;
let appHeight = app.renderer.view.height;

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

//function to create homePage sprites
function createHomeSprite(x, y, texture, type) {
	const sprite = new Sprite(texture);
	app.stage.addChild(sprite);
	sprite.anchor.set(0.5);
	sprite.position.x = x;
	sprite.position.y = y;
	//sprite.scale.set()
	return sprite;
}

const wallPaper = PIXI.Texture.from(
	'/siteAssets/wallpaper/BackgroundTexture.png'
);
const folder = PIXI.Texture.from('/siteAssets/welcome/PinkFolder.png');
const welcomeSign = PIXI.Texture.from('/siteAssets/welcome/welcomeSign.png');
const github = PIXI.Texture.from('/siteAssets/welcome/GithubBW.png');
const linkedIn = PIXI.Texture.from('/siteAssets/welcome/LinkedInBW.png');
const spotify = PIXI.Texture.from('/siteAssets/welcome/SpotifyBW.png');
const gmail = PIXI.Texture.from('/siteAssets/welcome/GmailBW.png');

const style = {
	fontFamily: 'Nunito Sans',
	fontSize: 25,
	fontWeight: 'bold',
};

// let wallPaperSprite = createHomeSprite(
// 	appWidth / 2,
// 	appHeight / 2 + appHeight / 20,
// 	wallPaper
// );
// wallPaperSprite.width = appWidth;
// wallPaperSprite.height = appHeight - appHeight / 20;

/* create a tiling sprite ...
 * requires a texture, a width and a height
 * in WebGL the image size should preferably be a power of two
 */
let wallPaperSprite = new TilingSprite(
	wallPaper,
	app.renderer.width,
	app.renderer.height
);
app.stage.addChild(wallPaperSprite);

//top bar
let topBar = new PIXI.Graphics();
topBar
	.beginFill(0x1d0046)
	.drawRect(0, 0, appWidth, appHeight / 15)
	.endFill();
app.stage.addChild(topBar);
//top bar text
let topBarText = new PIXI.Text('Jacqueline Feit, Software Developer', style);
topBarText.visible = true;
topBarText.position.x = topBar.position.x + appWidth * 0.01;
topBarText.position.y = topBar.position.y + appHeight * 0.01;
topBarText.style.fill = 0xffffff;
app.stage.addChild(topBarText);

//dock
let dock = new PIXI.Graphics();
dock
	.beginFill(0x1d0046)
	.drawRect(appWidth / 4, appHeight / 1.05, appWidth * 0.5, appHeight / 15)
	.endFill();
app.stage.addChild(dock);

//folder 1
let folderSpriteOne = createHomeSprite(appWidth / 4, appHeight / 3.5, folder);
folderSpriteOne.scale.set(0.25);
let folderOneText = new PIXI.Text('About', style);
folderOneText.visible = true;
folderOneText.position.x =
	folderSpriteOne.position.x - folderSpriteOne.position.x / 10;
folderOneText.position.y =
	folderSpriteOne.position.y - folderSpriteOne.position.y / 15;
app.stage.addChild(folderOneText);
//folder 2
let folderSpriteTwo = createHomeSprite(
	appWidth / 4,
	appHeight / 3.5 + appHeight / 4,
	folder
);
folderSpriteTwo.scale.set(0.25);
let folderTwoText = new PIXI.Text('Projects', style);
folderTwoText.visible = true;
folderTwoText.position.x =
	folderSpriteOne.position.x - folderSpriteTwo.position.x / 8;
folderTwoText.position.y =
	folderSpriteTwo.position.y - folderSpriteTwo.position.y / 30;
app.stage.addChild(folderTwoText);
//folder 3
let folderSpriteThree = createHomeSprite(
	appWidth / 4,
	appHeight / 3.5 + (appHeight / 4) * 2,
	folder
);
folderSpriteThree.scale.set(0.25);
let folderThreeText = new PIXI.Text('Resume', style);
folderThreeText.visible = true;
folderThreeText.position.x =
	folderSpriteThree.position.x - folderSpriteThree.position.x / 8;
folderThreeText.position.y =
	folderSpriteThree.position.y - folderSpriteThree.position.y / 40;
app.stage.addChild(folderThreeText);

//welcome sign
let welcomeSignSprite = createHomeSprite(
	appWidth / 1.7,
	appHeight / 5,
	welcomeSign
);
welcomeSignSprite.scale.set(0.2);
app.stage.addChild(welcomeSignSprite);
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
