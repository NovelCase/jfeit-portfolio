import React from 'react';
import * as PixiApp from '../pixi/mainStage.js';
import * as PIXI from 'pixi.js';
import { Scrollbox } from 'pixi-scrollbox';
import { text } from '../data';
export const openResumeLink = () => {
	PixiApp.resumeContainer.visible = true;
};
let resumeScroll;
export default class Resume extends React.Component {
	createPopUpRect(x, y, width, height) {
		const rect = new PIXI.Graphics();
		rect.beginFill(0xe3cdfe).drawRect(x, y, width, height).endFill();
		PixiApp.resumeContainer.visible = false;
		PixiApp.resumeContainer.addChild(rect);
		const blur = new PIXI.filters.BlurFilter(3, 4);
		rect.filters = [blur];
		const bar = new PIXI.Graphics();
		bar
			.beginFill(0x361876)
			.drawRect(x, y, width, height / 22)
			.endFill();
		bar.visible = true; //set to false when I have click functionality
		PixiApp.resumeContainer.addChild(bar);
		const close = new PIXI.Graphics();
		close
			.beginFill(0xe5699d)
			.drawCircle(x * 1.16, y * 1.85, 15)
			.endFill();
		close.visible = true; //set to false when I have click functionality
		close.interactive = true;
		close.buttonMode = true;
		PixiApp.resumeContainer.addChild(close);
		return [rect, bar, close];
	}
	createSprite(texture, x, y, scaleX, scaleY) {
		const sprite = new PIXI.Sprite(texture);
		sprite.anchor.set(0.5);
		sprite.position.x = x;
		sprite.position.y = y;
		if (scaleY) {
			sprite.scale.x = scaleX;
			sprite.scale.y = scaleY;
		} else {
			sprite.scale.set(scaleX);
		}
		PixiApp.resumeContainer.addChild(sprite);
		//resumeScroll.content.addChild(sprite);
		return sprite;
	}

	componentDidMount() {
		let [resumePopUp, resumeBar, resumeClose] = this.createPopUpRect(
			window.innerWidth / 8,
			(window.innerHeight / 4) * 0.1,
			(window.innerWidth / 4) * 3,
			(window.innerHeight / 4) * 3.8
		);

		resumeClose.on('click', () => {
			PixiApp.resumeContainer.visible = false;
			PixiApp.folderSpriteThree.visible = true;
		});

		const resumeTexture = PIXI.Texture.from(
			'siteAssets/about/Levine_Resume_12.12.20-1 2.png'
		);

		/* Resume */
		const resumeSprite = this.createSprite(
			resumeTexture,
			window.innerWidth / 2,
			window.innerHeight / 2
		);
	}

	render() {
		return <div></div>;
	}
}
