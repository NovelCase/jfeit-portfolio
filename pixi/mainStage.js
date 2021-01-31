const Resume = require('../client/Resume');

const Project = require('../client/ProjectView');

const { Sprite, TilingSprite } = require('pixi.js');
const PIXI = require('pixi.js');
const About = require('../client/AboutMe');
export const app = new PIXI.Application({
	transparent: false,
	resizeTo: window,
});

app.renderer.backgroundColor = 0x090135;
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);

let ticker = PIXI.Ticker.shared;

ticker.autoStart = false;

ticker.start();
ticker.add(function (time) {
	app.renderer.render(app.stage);
});
let startclick;
export let test = new PIXI.Container();
app.stage.addChild(test);

let appWidth = app.renderer.view.width;
let appHeight = app.renderer.view.height;

window.addEventListener('resize', resize);
let projFuncs = {
	About: aboutDragEnd,
	Projects: projDragEnd,
	Resume: resumeDragEnd,
};
const scales = {
	1800: 1.2,
	1600: 1,
	1500: 0.9,
	1400: 0.7,
};

//for scaling adjustment not on refresh
function resize() {
	app.renderer.resize(window.innerWidth, window.innerHeight);
	if (window.innerWidth < 1400) {
		app.stage.children.forEach((child) => {
			child.scale.x = scales[1400];
		});
	} else if (window.innerWidth < 1500) {
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
function createHomeSprite(x, y, texture, name) {
	const sprite = new Sprite(texture);
	app.stage.addChild(sprite);
	sprite.anchor.set(0.5);
	sprite.position.x = x;
	sprite.position.y = y;
	if (name) {
		sprite.name = name;
		sprite.interactive = true;
		sprite.buttonMode = true;
		sprite
			// events for drag start
			.on('pointerover', socialRollover)
			.on('pointerout', socialRollout)
			.on('pointertap', socialClick);
	}
	sprite.scale.set(0.5);
	return sprite;
}
function socialRollover(event) {
	this.texture = hoverStates[this.name][1];
}
function socialRollout(event) {
	this.texture = hoverStates[this.name][0];
}
function socialClick(event) {
	window.open(hoverStates[this.name][2], '_blank');
}

const wallPaper = PIXI.Texture.from('/siteAssets/wallpaper/newBackground.png');
const folder = PIXI.Texture.from('/siteAssets/welcome/PinkFolder.png');
const welcomeSign = PIXI.Texture.from('/siteAssets/welcome/welcomeSign.png');
const github = PIXI.Texture.from('/siteAssets/welcome/Github-black.png');
const githubHover = PIXI.Texture.from('/siteAssets/welcome/Github-pink.png');
const linkedIn = PIXI.Texture.from('/siteAssets/welcome/LinkedIn-black.png');
const linkedInHover = PIXI.Texture.from(
	'/siteAssets/welcome/LinkedIn-pink.png'
);
const spotify = PIXI.Texture.from('/siteAssets/welcome/Spotify-black.png');
const spotifyHover = PIXI.Texture.from('/siteAssets/welcome/Spotify-pink.png');
const gmail = PIXI.Texture.from('/siteAssets/welcome/Gmail-black.png');
const gmailHover = PIXI.Texture.from('/siteAssets/welcome/Gmail-pink.png');

const hoverStates = {
	github: [github, githubHover, 'https://github.com/jackiefeit94'],
	spotify: [spotify, spotifyHover, ''],
	gmail: [gmail, gmailHover, 'mailto: jackiefeit94@gmail.com'],
	linkedIn: [
		linkedIn,
		linkedInHover,
		'https://www.linkedin.com/in/jackie-levine-feit/',
	],
};
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
topBarText.interactive = true;
topBarText.buttonMode = true;
app.stage.addChild(topBarText);
topBarText.on('click', () => {
	headShotContainer.children.forEach((child) => (child.visible = true));
});

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
	github,
	'github'
);

// githubSprite.on('click', () => {
// 	window.open('https://github.com/jackiefeit94', '_blank');
// });
// githubSprite.on('tap', () => {
// 	window.open('https://github.com/jackiefeit94', '_blank');
// });

let linkedInSprite = createHomeSprite(
	appWidth / 4 + 250,
	appHeight / 1.1,
	linkedIn,
	'linkedIn'
);

// linkedInSprite.on('click', () => {
// 	window.open('https://www.linkedin.com/in/jackie-levine-feit/', '_blank');
// });
// linkedInSprite.on('tap', () => {
// 	window.open('https://www.linkedin.com/in/jackie-levine-feit/', '_blank');
// });

let spotifySprite = createHomeSprite(
	appWidth / 4 + 400,
	appHeight / 1.1,
	spotify,
	'spotify'
);
// spotifySprite.scale.set(0.5);

let gmailSprite = createHomeSprite(
	appWidth / 4 + 550,
	appHeight / 1.1,
	gmail,
	'gmail'
);

// gmailSprite.scale.set(0.25);

//folder 1
export let folderSpriteOne = createItem(
	appWidth / 4,
	appHeight / 3.5,
	folder,
	'About'
);

// let folderOneText = new PIXI.Text('About', style);
// folderOneText.visible = true;

app.stage.addChild(folderSpriteOne);
//folder 2
export let folderSpriteTwo = createItem(
	appWidth / 4,
	(appHeight / 3.5) * 2,
	folder,
	'Projects'
);

app.stage.addChild(folderSpriteTwo);
//folder 3
export let folderSpriteThree = createItem(
	appWidth / 4,
	appHeight / 3.5 + (appHeight / 4) * 2,
	folder,
	'Resume'
);
app.stage.addChild(folderSpriteThree);

//welcome sign
let welcomeSignSprite = createHomeSprite(
	appWidth / 1.2,
	appHeight / 5,
	welcomeSign
);
welcomeSignSprite.scale.set(0.2);
app.stage.addChild(welcomeSignSprite);

//export let aboutFolder = createItem(250, 400, pinkFolder, 'About Me');
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
		.on('pointerover', onPointerMove)
		.on('pointerout', onPointerOut)
		.on('pointerdown', onDragStart)
		// events for drag end
		.on('pointerup', projFuncs[name])
		// events for drag move
		.on('pointermove', onDragMove);

	// move the sprite to its designated position
	item.position.x = x;
	item.position.y = y;
	const content = new PIXI.Sprite(texture);
	item.addChild(content);
	content.anchor.set(0.5);
	content.scale.set(0.25);
	const text = new PIXI.Text(name, style);
	text.anchor.set(0.5);
	text.position.x = content.position.x;
	text.position.y = content.position.y;
	item.addChild(text);
	return item;
}
function onPointerMove(event) {
	this.rotation = 120;
}
function onPointerOut(event) {
	this.rotation = 0;
}
function onDragStart(event) {
	// store a reference to the data
	// the reason for this is because of multitouch
	// we want to track the movement of this particular touch
	this.data = event.data;
	this.alpha = 0.5;
	this.dragging = true;
	console.log(this);
	startclick = this.data.getLocalPosition(this.parent);
}
function aboutDragEnd() {
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
function projDragEnd() {
	this.alpha = 1;
	this.dragging = false;
	const newPosition = this.data.getLocalPosition(this.parent);
	console.log(this.position, newPosition);
	if (
		Math.abs(newPosition.x - startclick.x) < 10 &&
		Math.abs(newPosition.y - startclick.y) < 10
	) {
		Project.openProjLink();
		this.visible = false;
	}

	startclick = null;
	// set the interaction data to null
	this.data = null;
}
function resumeDragEnd() {
	this.alpha = 1;
	this.dragging = false;
	const newPosition = this.data.getLocalPosition(this.parent);
	console.log(this.position, newPosition);
	if (
		Math.abs(newPosition.x - startclick.x) < 10 &&
		Math.abs(newPosition.y - startclick.y) < 10
	) {
		Resume.openResumeLink();
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
projectContainer.visible = false;
export let aboutContainer = new PIXI.Container();
app.stage.addChild(aboutContainer);
export let headShotContainer = new PIXI.Container();
app.stage.addChild(headShotContainer);
export let resumeContainer = new PIXI.Container();
app.stage.addChild(resumeContainer);
