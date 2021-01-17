import React from 'react';
import * as PixiApp from '../pixi/mainStage.js';
import * as PIXI from 'pixi.js';

let projectPopUp;
let projectBar;
let projectClose;
let projectTitle;
let projectDetails;
let weatherWatcher;
let weatherLeaf;
export default class Project extends React.Component {
  createPopUpRect(x, y) {
    let width = (window.innerWidth / 4) * 3;
    let height = (window.innerHeight / 4) * 3.8;
    const rect = new PIXI.Graphics();
    rect.beginFill(0xe3cdfe).drawRect(x, y, width, height).endFill();
    rect.visible = true; //set to false when I have click functionality
    PixiApp.popUps.addChild(rect);
    const blur = new PIXI.filters.BlurFilter(3, 4);
    rect.filters = [blur];
    const bar = new PIXI.Graphics();
    bar
      .beginFill(0x361876)
      .drawRect(x, y, width, height / 22)
      .endFill();
    bar.visible = true; //set to false when I have click functionality
    PixiApp.popUps.addChild(bar);
    const close = new PIXI.Graphics();
    close
      .beginFill(0xe5699d)
      .drawCircle(x * 1.16, y * 1.85, 15)
      .endFill();
    close.visible = true; //set to false when I have click functionality
    close.interactive = true;
    close.buttonMode = true;
    PixiApp.popUps.addChild(close);
    return [rect, bar, close];
  }
  createText(words, style, x, y, interactive) {
    const text = new PIXI.Text(words, style);
    text.visible = true; //set to false when I have click functionality
    text.position.x = x;
    text.position.y = y;
    if (interactive) {
      text.interactive = true;
      text.buttonMode = true;
    }
    PixiApp.text.addChild(text);
    return text;
  }
  // keyboard() {
  //   onwheel = (event) => {
  //     if (
  //       app.stage.pivot.x < 0 ||
  //       app.stage.pivot.x + (event.deltaY * 1.3 || event.deltaX * 1.3) < 0
  //     ) {
  //       app.stage.pivot.x = 0;
  //     } else if (
  //       app.stage.pivot.x > appWidth * 3 ||
  //       app.stage.pivot.x + (event.deltaY * 1.3 || event.deltaX * 1.3) >
  //         appWidth * 3
  //     ) {
  //       app.stage.pivot.x = appWidth * 3;
  //     } else app.stage.pivot.x += event.deltaY * 1.3 || event.deltaX * 1.3;
  //   };
  // }
  componentDidMount() {
    [projectPopUp, projectBar, projectClose] = this.createPopUpRect(
      window.innerWidth / 8,
      (window.innerHeight / 4) * 0.1
    );

    projectClose.on('click', () => {
      projectPopUp.visible = false;
      projectBar.visible = false;
      projectClose.visible = false;
      projectTitle.visible = false;
    });

    projectTitle = this.createText(
      'Projects',
      { fontSize: 45 },
      (projectPopUp.width / 4) * 2.43,
      projectPopUp.height / 9
    );

    projectDetails = new PIXI.Graphics();
    projectDetails
      .beginFill(0x361876)
      .drawRect(
        projectPopUp.width / 4.55,
        projectPopUp.height / 5,
        (projectPopUp.width / 4) * 3.6,
        (projectPopUp.height / 4) * 3.2
      )
      .endFill();
    projectDetails.visible = true; //set to false when I have click functionality
    projectDetails.interactive = true;
    projectDetails.cursor = 'all-scroll';
    PixiApp.popUps.addChild(projectDetails);

    const weatherContainer = new PIXI.Container();
    projectDetails.addChild(weatherContainer);
    weatherContainer.interactive = true;

    const weatherTexture = PIXI.Texture.from(
      'siteAssets/projects/WeatherWatcher.png'
    );
    weatherWatcher = new PIXI.Sprite(weatherTexture);
    weatherWatcher.anchor.set(0.7);
    weatherWatcher.position.x = projectDetails.width / 1.87;
    weatherWatcher.position.y = projectDetails.height / 1.6;
    weatherWatcher.scale.set(0.5);
    weatherContainer.addChild(weatherWatcher);

    const leafTexture = PIXI.Texture.from('siteAssets/projects/looseLeaf.png');
    weatherLeaf = new PIXI.Sprite(leafTexture);
    weatherLeaf.anchor.set(1.5);
    weatherLeaf.position.x = projectDetails.width / 0.78;
    weatherLeaf.position.y = projectDetails.height / 0.92;
    weatherLeaf.scale.set(2.3);
    weatherLeaf.interactive = true;
    weatherLeaf.buttonMode = true;
    weatherContainer.addChild(weatherLeaf);
    weatherLeaf.on('click', () => console.log('click and scroll'));

    // let tester = new PIXI.Graphics();
    // tester
    //   .beginFill(0xff0000)
    //   .drawRect(projectDetails.width / 4, projectDetails.height / 4, 200, 200);
    // tester.visible = true;
    // tester.interactive = true;
    // projectDetails.addChild(tester);
    weatherContainer.on('scroll', (ev) => {
      console.log(ev.wheelDelta);
      if (ev.wheelDelta >= 4) {
        weatherContainer.visible = false;
      } else {
        console.log(weatherContainer.y);
        weatherContainer.y -= ev.wheelDelta;
      }
      //need to fix this so it doesn't go past certain point
    });
  }
  render() {
    return <div></div>;
  }
}
