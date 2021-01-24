import React from 'react';
import * as PixiApp from '../pixi/mainStage.js';
import * as PIXI from 'pixi.js';

export default class HeadShot extends React.Component {
  createPopUpRect(x, y, width, height) {
    const rect = new PIXI.Graphics();
    rect.beginFill(0xe3cdfe).drawRect(x, y, width, height).endFill();
    rect.visible = false; //set to false when I have click functionality
    PixiApp.headShotContainer.addChild(rect);
    const blur = new PIXI.filters.BlurFilter(3, 4);
    rect.filters = [blur];
    const bar = new PIXI.Graphics();
    bar
      .beginFill(0x361876)
      .drawRect(x, y, width, height / 22)
      .endFill();
    bar.visible = false; //set to false when I have click functionality
    PixiApp.headShotContainer.addChild(bar);
    const close = new PIXI.Graphics();
    close
      .beginFill(0xe5699d)
      .drawCircle(x * 1.16, y * 1.85, 15)
      .endFill();
    close.visible = false; //set to false when I have click functionality
    close.interactive = true;
    close.buttonMode = true;
    PixiApp.headShotContainer.addChild(close);
    return [rect, bar, close];
  }
  componentDidMount() {
    let [headshotPopUp, headshotBar, headshotClose] = this.createPopUpRect(
      (window.innerWidth / 8) * 1.35,
      (window.innerHeight / 4) * 0.1,
      (window.innerWidth / 4) * 2.3,
      (window.innerHeight / 4) * 3.85
    );

    headshotClose.on('click', () => {
      PixiApp.headShotContainer.children.forEach((child) => {
        child.visible = false;
      });
    });

    /* TEXT */
    const message = new PIXI.Text('Thanks for visiting!', {
      fontSize: 47,
      letterSpacing: 2,
    });
    message.visible = false; //set to false when I have click functionality
    message.position.x = (headshotPopUp.width / 2) * 1.1;
    message.position.y = (headshotPopUp.height / 4) * 0.33;
    PixiApp.headShotContainer.addChild(message);

    /* HEADSHOT */
    const headshotTexture = new PIXI.Texture.from('siteAssets/Headshot.jpg');
    const photo = new PIXI.Sprite(headshotTexture);
    photo.visible = false;
    photo.anchor.set(0.5);
    photo.scale.set(0.22);
    photo.position.x = (headshotPopUp.width / 2) * 1.55;
    photo.position.y = (headshotPopUp.height / 2) * 1.17;
    PixiApp.headShotContainer.addChild(photo);

    /* SPOTLIGHT */
    const lighting = new PIXI.Container();
    lighting.on('display', (element) => {
      element.blendMode = PIXI.BLEND_MODES.ADD;
    });
    lighting.useRenderTexture = true;
    lighting.clearColor = [0.5, 0.5, 0.5, 1]; // ambient gray
    lighting.visible = false;
    PixiApp.headShotContainer.addChild(lighting);

    // const lightingSprite = new PIXI.Sprite();
    // lightingSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    // PixiApp.headShotContainer.addChild(lightingSprite);

    const W = headshotPopUp.width / 2;
    const H = headshotPopUp.height / 2;
    const PAD = 20;
    const resolution = 1;
    const WIDTH = W / resolution;
    const HEIGHT = H / resolution;
    function updateLightBulb(lightbulb) {
      lightbulb.x += lightbulb.vx;
      lightbulb.y += lightbulb.vy;
      if (lightbulb.x > WIDTH + PAD) {
        lightbulb.x -= WIDTH + 2 * PAD;
      }
      if (lightbulb.x < -PAD) {
        lightbulb.x += WIDTH + 2 * PAD;
      }
      if (lightbulb.y > HEIGHT + PAD) {
        lightbulb.y -= HEIGHT + 2 * PAD;
      }
      if (lightbulb.y < -PAD) {
        lightbulb.y += HEIGHT + 2 * PAD;
      }
    }
    function createLightBulb() {
      const lightbulb = new PIXI.Graphics();
      lightbulb.update = updateLightBulb;

      const angle = Math.random() * Math.PI * 2;
      const speed = 150.0; // px per second
      lightbulb.vx = (Math.cos(angle) * speed) / 60.0;
      lightbulb.vy = (Math.sin(angle) * speed) / 60.0;
      lightbulb.position.set(Math.random() * WIDTH, Math.random() * HEIGHT);

      const rad = 50 + Math.random() * 20;
      lightbulb.beginFill(0xf4f5e7, 0.25);
      lightbulb.drawCircle(0, 0, rad);
      lightbulb.endFill();
      lightbulb.parentLayer = lighting; // <-- try comment it

      lighting.addChild(lightbulb);

      return lightbulb;
    }

    for (let i = 0; i < 20; i++) {
      lighting.addChild(createLightBulb());
    }

    PixiApp.app.ticker.add(() => {
      lighting.children.forEach(updateLightBulb);
    });
  }
  render() {
    return <div></div>;
  }
}
