const { Sprite, TilingSprite } = require('pixi.js');
const PIXI = require('pixi.js');

export const app = new PIXI.Application({
	transparent: false,
	resizeTo: window,
});

const About = require('../client/AboutMe');
const route = {
	'About Me': About,
};

app.renderer.backgroundColor = 0x090135;
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);
export let test = new PIXI.Container();
app.stage.addChild(test);

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
	test.addChild(item);
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

window.addEventListener('resize', resize);

const scales = {
	1800: 1.2,
	1600: 1,
	1500: 0.9,
};

//for scaling adjustment not on refresh
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

const wallPaper = PIXI.Texture.from('/siteAssets/wallpaper/newBackground.png');
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
let topBarText = new PIXI.Text('Jacqueline Feit - Software Developer', style);
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

//icons

let githubSprite = createHomeSprite(
	appWidth / 4 + 100,
	appHeight / 1.1,
	github
);

githubSprite.on('click', () => {
	window.open('https://github.com/jackiefeit94', '_blank');
});
githubSprite.on('tap', () => {
	window.open('https://github.com/jackiefeit94', '_blank');
});

let linkedInSprite = createHomeSprite(
	appWidth / 4 + 250,
	appHeight / 1.1,
	linkedIn
);

linkedInSprite.on('click', () => {
	window.open('https://www.linkedin.com/in/jackie-levine-feit/', '_blank');
});
linkedInSprite.on('tap', () => {
	window.open('https://www.linkedin.com/in/jackie-levine-feit/', '_blank');
});

let spotifySprite = createHomeSprite(
	appWidth / 4 + 400,
	appHeight / 1.1,
	spotify
);
spotifySprite.scale.set(0.5);

let gmailSprite = createHomeSprite(appWidth / 4 + 550, appHeight / 1.1, gmail);

gmailSprite.scale.set(0.25);

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
	appWidth / 1.2,
	appHeight / 5,
	welcomeSign
);
welcomeSignSprite.scale.set(0.2);
app.stage.addChild(welcomeSignSprite);

//define scale

//place to define pixi textures and create sprites

//place to add event handlers

//place to connect sprites/shapes created in react components

//e.g.
// export let popUps = new PIXI.Container();
// app.stage.addChild(popUps);

/** Pop Ups**/

export let projectContainer = new PIXI.Container();
app.stage.addChild(projectContainer);

export let resumeContainer = new PIXI.Container();
app.stage.addChild(resumeContainer);
