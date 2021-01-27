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

let appWidth = app.renderer.view.width;
let appHeight = app.renderer.view.height;

//place to put background colors/textures

let projFuncs = {
  About: aboutDragEnd,
  Projects: projDragEnd,
  Resume: aboutDragEnd,
};

// let scale = {
//   github: 1,
//   linkedIn: 1,
//   spotify: 0.5,
//   gmail: 0.25,
//   welcomeSign: 0.2,
// };

//function to create homePage sprites
function createHomeSprite(x, y, texture, type) {
  const sprite = new Sprite(texture);
  sprite.anchor.set(0.5);
  sprite.position.x = x;
  sprite.position.y = y;
  homeContainer.addChild(sprite);
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

//dock
let dock = new PIXI.Graphics();
dock
  .beginFill(0x1d0046)
  .drawRect(
    app.renderer.view.width / 4,
    app.renderer.view.height / 1.05,
    app.renderer.view.width * 0.5,
    app.renderer.view.height / 15
  )
  .endFill();
homeContainer.addChild(dock);

//icons

let githubSprite = createHomeSprite(
  app.renderer.view.width / 4 + 100,
  app.renderer.view.height / 1.1,
  github,
  'github'
);

githubSprite.on('click', () => {
  window.open('https://github.com/jackiefeit94', '_blank');
});
githubSprite.on('tap', () => {
  window.open('https://github.com/jackiefeit94', '_blank');
});

let linkedInSprite = createHomeSprite(
  app.renderer.view.width / 4 + 250,
  app.renderer.view.height / 1.1,
  linkedIn,
  'linkedIn'
);

linkedInSprite.on('click', () => {
  window.open('https://www.linkedin.com/in/jackie-levine-feit/', '_blank');
});
linkedInSprite.on('tap', () => {
  window.open('https://www.linkedin.com/in/jackie-levine-feit/', '_blank');
});

let spotifySprite = createHomeSprite(
  app.renderer.view.width / 4 + 400,
  app.renderer.view.height / 1.1,
  spotify,
  'spotify'
);
spotifySprite.scale.set(0.5);

let gmailSprite = createHomeSprite(
  app.renderer.view.width / 4 + 550,
  app.renderer.view.height / 1.1,
  gmail,
  'gmail'
);

gmailSprite.scale.set(0.25);

//folder 1
export let folderSpriteOne = createItem(
  app.renderer.view.width / 4,
  app.renderer.view.height / 3.5,
  folder,
  'About'
);

// let folderOneText = new PIXI.Text('About', style);
// folderOneText.visible = true;

megaContainer.addChild(folderSpriteOne);
//folder 2
export let folderSpriteTwo = createItem(
  app.renderer.view.width / 4,
  (app.renderer.view.height / 3.5) * 2,
  folder,
  'Projects'
);

megaContainer.addChild(folderSpriteTwo);
//folder 3
let folderSpriteThree = createItem(
  app.renderer.view.width / 4,
  app.renderer.view.height / 3.5 + (app.renderer.view.height / 4) * 2,
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
welcomeSignSprite.scale.set(0.2);

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
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    // events for drag end
    .on('mouseup', projFuncs[name])
    // .on('mouseupoutside', onDragEnd)
    .on('touchend', projFuncs[name])
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
  content.scale.set(0.25);
  const text = new PIXI.Text(name, style);
  text.anchor.set(0.5);
  text.position.x = content.position.x;
  text.position.y = content.position.y;
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

/* mobile scaling */
// if (window.outerWidth < 400) {
//   app.stage.children.forEach((child) => {
//     child.scale.x += 0.5;
//   });
// }

/* resize - web responsive*/
window.addEventListener('resize', resize);

//for scaling adjustment not on refresh
function resize() {
  // let resizeValue = 0.02;
  // if (window.innerWidth < app.renderer.view.width) {
  //   resizeValue = -0.02;
  // }
  let widthDiff = window.innerWidth - app.renderer.view.width;
  let heightDiff = window.innerHeight - app.renderer.view.height;
  let method = 'add';
  if (window.innerWidth < app.renderer.view.width) {
    method = 'subtract';
    widthDiff = app.renderer.view.width - window.innerWidth;
    heightDiff = app.renderer.view.height - window.innerHeight;
    // resizeValue = -0.02;
  }
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.stage.children.forEach((child, idx) => {
    if (method === 'add') {
      child.width += widthDiff;
      child.height += heightDiff;
      console.log(method, widthDiff, child.width, heightDiff, child.height);
    } else {
      child.width -= widthDiff;
      child.height -= heightDiff;
      console.log(method, widthDiff, child.width);
    }
    // child.children.forEach((innerChild, idx) => {
    //   if (idx !== 1) {
    //     innerChild.scale.x += resizeValue;
    //   }
    // });
  });
  // console.log(app.stage.children[1].width);
  // app.stage.children.forEach((child, idx) => {
  //   // child.scale.x += resizeValue;
  //   // console.log(child.scale.x, idx);
  //   console.log(child.width, idx);
  // });
}
// resize();
