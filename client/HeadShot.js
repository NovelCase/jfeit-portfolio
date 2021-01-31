import React from 'react';
import * as PixiApp from '../pixi/mainStage.js';
import * as PIXI from 'pixi.js';

export default class HeadShot extends React.Component {
  createPopUpRect(x, y, width, height) {
    let closeSize = { x: x + 20, y: y + 16, radius: 12 };
    let barWidth = 30;
    if (window.innerWidth < 1050) {
      x *= 0.5;
      width *= 1.5;
      closeSize.x = (width / 2) * 0.3;
      closeSize.y = (height / 4) * 0.17;
      closeSize.radius = width * 0.03;
      barWidth = width * 0.06;
    }
    const rect = new PIXI.Graphics();
    rect.beginFill(0xe3cdfe).drawRect(x, y, width, height).endFill();
    rect.visible = false; //set to false when I have click functionality
    PixiApp.headShotContainer.addChild(rect);
    const blur = new PIXI.filters.BlurFilter(3, 4);
    rect.filters = [blur];
    const bar = new PIXI.Graphics();
    bar.beginFill(0x361876).drawRect(x, y, width, barWidth).endFill();
    bar.visible = false; //set to false when I have click functionality
    PixiApp.headShotContainer.addChild(bar);
    const close = new PIXI.Graphics();
    close
      .beginFill(0xe5699d)
      .drawCircle(
        closeSize.x,
        closeSize.y,
        closeSize.radius
      ) /* (bar.width / 6) * 0.9, bar.height * 1.3, width * 0.03 */
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
      (window.innerHeight / 4) * 0.26,
      (window.innerWidth / 4) * 2.3,
      (window.innerHeight / 4) * 3.7
    );

    headshotClose.on('pointertap', () => {
      PixiApp.headShotContainer.children.forEach((child) => {
        child.visible = false;
      });
    });

    let stylePosition = {
      style: { fontSize: 47, letterSpacing: 2 },
      messageX: (headshotPopUp.width / 2) * 1.08,
      messageY: (headshotPopUp.height / 4) * 0.46,
      photoScale: 0.22,
      photoScaley: 0.22,
      photoX: (headshotPopUp.width / 2) * 1.55,
      photoY: (headshotPopUp.height / 2) * 1.25,
    };
    if (window.outerWidth < 500) {
      stylePosition.messageX = (headshotPopUp.width / 2) * 0.4;
      stylePosition.photoScale = 0.32;
      stylePosition.photoX = headshotPopUp.width / 1.65;
      if (window.outerHeight < 800) {
        stylePosition.messageX = (headshotPopUp.width / 2) * 0.4;
        stylePosition.style.fontSize = 80;
        stylePosition.photoScaley = 0.36;
      } else {
        stylePosition.messageX = (headshotPopUp.width / 2) * 0.3;
        stylePosition.style.fontSize = 85;
        stylePosition.photoScaley = 0.45;
      }
    } else if (window.outerWidth < 600) {
      stylePosition.style.fontSize = 60;
      stylePosition.messageX = (window.outerWidth / 2) * 0.85;
      stylePosition.photoScale = 0.26;
      stylePosition.photoX = window.outerWidth / 1.05;
    } else if (window.outerWidth < 800) {
      stylePosition.style.fontSize = 60;
      stylePosition.messageX = (headshotPopUp.width / 2) * 0.5;
      stylePosition.photoScale = 0.27;
      stylePosition.photoX = headshotPopUp.width / 1.7;
    } else if (window.outerWidth < 1050) {
      stylePosition.style.fontSize = 60;
      stylePosition.messageX = (window.outerWidth / 2) * 0.5;
      stylePosition.photoScale = 0.3;
      stylePosition.photoX = window.outerWidth / 2;
    }

    /* TEXT */
    const message = new PIXI.Text('Thanks for visiting!', stylePosition.style);
    message.visible = false; //set to false when I have click functionality
    message.position.x = stylePosition.messageX;
    message.position.y = stylePosition.messageY;
    PixiApp.headShotContainer.addChild(message);

    /* HEADSHOT */
    const headshotTexture = new PIXI.Texture.from('siteAssets/Headshot.jpg');
    const photo = new PIXI.Sprite(headshotTexture);
    photo.visible = false;
    photo.anchor.set(0.5);
    photo.scale.set(stylePosition.photoScale, stylePosition.photoScaley);
    photo.position.x = stylePosition.photoX;
    photo.position.y = stylePosition.photoY;
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

    const W = headshotPopUp.width * 0.85;
    const H = headshotPopUp.height * 0.78;
    const PAD = 0.5;
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
      const speed = 130.0; // px per second
      lightbulb.vx = (Math.cos(angle) * speed) / 60.0;
      lightbulb.vy = (Math.sin(angle) * speed) / 60.0;

      lightbulb.beginFill(0xf4f5e7, 0.25);
      lightbulb.drawCircle(
        (window.innerWidth / 8) * 1.7,
        (window.innerHeight / 4) * 0.5,
        headshotPopUp.width / 6
      );
      lightbulb.endFill();
      lightbulb.parentLayer = lighting;
      lightbulb.position.set(Math.random() * WIDTH, Math.random() * HEIGHT);

			lighting.addChild(lightbulb);

			return lightbulb;
		}

    for (let i = 0; i < 3; i++) {
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
