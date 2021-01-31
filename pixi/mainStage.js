const Project = require('../client/ProjectView');
const Resume = require('../client/Resume');
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

const megaContainer = new PIXI.Container();
app.stage.addChild(megaContainer);

let ticker = PIXI.Ticker.shared;

ticker.autoStart = false;

ticker.start();
ticker.add(function (time) {
	app.renderer.render(app.stage);
});
let startclick;
export let test = new PIXI.Container();
megaContainer.addChild(test);

export let appWidth = app.renderer.view.width;
export let appHeight = app.renderer.view.height;

//place to put background colors/textures

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

//function to create homePage sprites
export function createHomeSprite(x, y, texture, name) {
	const sprite = new Sprite(texture);
	homeContainer.addChild(sprite);
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
		sprite.scale.set(0.3);
	}
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

const folder = PIXI.Texture.from('/siteAssets/welcome/folder-inverted.png');
const welcomeSign = PIXI.Texture.from('/siteAssets/welcome/welcomeNew.png');

const github = PIXI.Texture.from('/siteAssets/welcome/Github-purp.png');
const githubHover = PIXI.Texture.from(
	'/siteAssets/welcome/Github-inverted.png'
);
const linkedIn = PIXI.Texture.from('/siteAssets/welcome/LinkedIn-purp.png');
const linkedInHover = PIXI.Texture.from(
	'/siteAssets/welcome/LinkedIn-inverted.png'
);

const gmail = PIXI.Texture.from('/siteAssets/welcome/Gmail-purp.png');
const gmailHover = PIXI.Texture.from('/siteAssets/welcome/Gmail-inverted.png');

const hoverStates = {
	github: [github, githubHover, 'https://github.com/jackiefeit94'],
	gmail: [
		gmail,
		gmailHover,
		'mailto:jackiefeit94@gmail.com?subject=Just visited your website!',
	],
	linkedIn: [
		linkedIn,
		linkedInHover,
		'https://www.linkedin.com/in/jackie-levine-feit/',
	],
};

const style = {
	fontFamily: 'Gloria Hallelujah',
	fontSize: 25,
	fontWeight: 'bold',
};
const homeContainer = new PIXI.Container();
megaContainer.addChild(homeContainer);

let wallPaperSprite = new TilingSprite(
	wallPaper,
	app.renderer.view.width,
	app.renderer.view.height
);
homeContainer.addChild(wallPaperSprite);

//top bar
let topBar = new PIXI.Graphics();
topBar
	.beginFill(0x1d0046)
	.drawRect(0, 0, app.renderer.view.width, app.renderer.view.height / 15)
	.endFill();
homeContainer.addChild(topBar);
//top bar text
let topBarText = new PIXI.Text('Jacqueline Feit - Software Developer', style);
topBarText.visible = true;
topBarText.position.x = topBar.position.x + app.renderer.view.width * 0.01;
topBarText.position.y = topBar.position.y + app.renderer.view.height * 0.01;
topBarText.style.fill = 0xffffff;
topBarText.interactive = true;
topBarText.buttonMode = true;
homeContainer.addChild(topBarText);
topBarText.on('pointertap', () => {
	headShotContainer.children.forEach((child) => (child.visible = true));
});
topBarText.on('tap', () => {
	headShotContainer.children.forEach((child) => (child.visible = true));
});

topBarText.on('mouseover', () => {
	topBarText.tint = 0x8034eb;
});
topBarText.on('mouseout', () => {
	topBarText.tint = 0xffffff;
});
//dock
let dock = new PIXI.Graphics();
dock
	.beginFill(0x726980)
	.drawRect(appWidth / 3.5, appHeight / 1.02, appWidth * 0.4, appHeight / 15)
	.endFill();

homeContainer.addChild(dock);

//icons

let githubSprite = createHomeSprite(
	app.renderer.view.width / 4 + 100,
	app.renderer.view.height / 1.1,
	github,
	'github'
);

let linkedInSprite = createHomeSprite(
	app.renderer.view.width / 4 + 250,
	app.renderer.view.height / 1.1,
	linkedIn,
	'linkedIn'
);

// let spotifySprite = createHomeSprite(
// 	app.renderer.view.width / 4 + 400,
// 	app.renderer.view.height / 1.1,
// 	spotify,
// 	'spotify'
// );

let gmailSprite = createHomeSprite(
	app.renderer.view.width / 4 + 550,
	app.renderer.view.height / 1.1,
	gmail,
	'gmail'
);

export let spotifyContainer = new PIXI.Container();
app.stage.addChild(spotifyContainer);

//folder 1
export let folderSpriteOne = createItem(
	app.renderer.view.width / 4,
	app.renderer.view.height / 3.5,
	folder,
	'About'
);

megaContainer.addChild(folderSpriteOne);
//folder 2
export let folderSpriteTwo = createItem(
	app.renderer.view.width / 4,
	(app.renderer.view.height / 3.5) * 1.8,
	folder,
	'Projects'
);

megaContainer.addChild(folderSpriteTwo);
//folder 3
export let folderSpriteThree = createItem(
	app.renderer.view.width / 4,
	app.renderer.view.height / 3.5 + (app.renderer.view.height / 4) * 1.8,
	folder,
	'Resume'
);
megaContainer.addChild(folderSpriteThree);

//welcome sign
let welcomeSignSprite = createHomeSprite(
	app.renderer.view.width / 1.2,
	app.renderer.view.height / 5,
	welcomeSign,
	'welcomeSign'
);

welcomeSignSprite.on('mouseover', () => {
	welcomeSignSprite.tint = 0x8034eb;
	welcomeSignSprite.rotation -= 0.4;
});

welcomeSignSprite.on('mouseout', () => {
	welcomeSignSprite.tint = 0xffffff;
	welcomeSignSprite.rotation = 0;
});

//welcome sprite swing attempt
// welcomeSignSprite.vx = 1;
// welcomeSignSprite.vy = 1;

// function gameLoop() {
// 	//Call this `gameLoop` function on the next screen refresh
// 	//(which happens 60 times per second)
// 	requestAnimationFrame(gameLoop);

// 	//Move the cat
// 	// if ((welcomeSignSprite.rotation = 0.2)) {
// 	// 	welcomeSignSprite.rotation = -0.2;
// 	// } else welcomeSignSprite.rotation = 0.2;
// 	if (welcomeSignSprite.rotation !== 0.5) {
// 		welcomeSignSprite.rotation += 0.05;
// 	}

// 	// if (welcomeSignSprite.rotation === 0.05) {
// 	// 	setTimeout(() => {
// 	// 		welcomeSignSprite.rotation -= 0.1;
// 	// 	}, 1000);
// 	// }
// }

// //Start the loop
// gameLoop();

function createItem(x, y, texture, name) {
	// create a sprite
	const item = new PIXI.Container();
	test.addChild(item);
	// make sprite interactive
	item.interactive = true;
	// make hand appear on rollover
	item.buttonMode = true;

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
		Resume.openResLink();
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
		this.position.x = Math.min(this.position.x, app.renderer.view.width);
		this.position.y = Math.max(0, newPosition.y);
		this.position.y = Math.min(newPosition.y, app.renderer.view.height);
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
megaContainer.addChild(projectContainer);
projectContainer.visible = false;
export let aboutContainer = new PIXI.Container();
megaContainer.addChild(aboutContainer);
export let headShotContainer = new PIXI.Container();
megaContainer.addChild(headShotContainer);
export let resumeContainer = new PIXI.Container();

megaContainer.addChild(resumeContainer);

/* resize - web responsive*/
window.addEventListener('resize', resize);

//for scaling adjustment not on refresh
function resize() {
	let widthDiff = window.innerWidth - app.renderer.view.width;
	let heightDiff = window.innerHeight - app.renderer.view.height;
	let method = 'add';
	if (window.innerWidth < app.renderer.view.width) {
		method = 'subtract';
		widthDiff = app.renderer.view.width - window.innerWidth;
		heightDiff = app.renderer.view.height - window.innerHeight;
	}
	app.renderer.resize(window.innerWidth, window.innerHeight);
	app.stage.children.forEach((child, idx) => {
		if (method === 'add') {
			child.width += widthDiff;
			child.height += heightDiff;
		} else {
			child.width -= widthDiff;
			child.height -= heightDiff;
		}
	});
}
