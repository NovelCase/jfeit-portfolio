import React from 'react';
import * as PixiApp from '../pixi/mainStage.js';
import * as PIXI from 'pixi.js';
import { Scrollbox } from 'pixi-scrollbox';
let resumeScroll;
export const openResLink = () => {
	PixiApp.resumeContainer.visible = true;
};
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
			.beginFill(0x1d0046)
			.drawRect(x, y, width, height / 22)
			.endFill();
		bar.visible = true; //set to false when I have click functionality
		PixiApp.resumeContainer.addChild(bar);
		const close = new PIXI.Graphics();
		close
			.beginFill(0xe5699d)
			.drawCircle(x * 1.16, y * 1.85, 10)
			.endFill();
		close.visible = true; //set to false when I have click functionality
		close.interactive = true;
		close.buttonMode = true;
		close.on('mouseover', () => {
			close.tint = 0xe3cdfe;
		});
		close.on('mouseout', () => {
			close.tint = 0xffffff;
		});
		PixiApp.resumeContainer.addChild(close);
		return [rect, bar, close];
	}
	createSprite(texture, x, y, scaleX, scaleY) {
		const sprite = new PIXI.Sprite(texture);
		sprite.anchor.set(0.5);
		sprite.position.x = x;
		sprite.position.y = y;
		sprite.interactive = true;
		sprite.buttonMode = true;
		if (scaleY) {
			sprite.scale.x = scaleX;
			sprite.scale.y = scaleY;
		} else {
			sprite.scale.set(scaleX);
		}
		//PixiApp.resumeContainer.addChild(sprite);
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

		resumeClose.on('pointertap', () => {
			PixiApp.resumeContainer.visible = false;
			PixiApp.folderSpriteThree.visible = true;
			PixiApp.shadow.visible = false;
		});

		const resumeTexture = PIXI.Texture.from(
			'siteAssets/about/Levine_Resume_12.12.20-1 2.png'
		);
		resumeScroll = PixiApp.resumeContainer.addChild(
			new Scrollbox({
				boxWidth: resumePopUp.width * 0.9,
				boxHeight: resumePopUp.height * 0.9,
			})
		);
		resumeScroll.position.set(
			resumePopUp.width / 4.55,
			resumePopUp.height / 12
		);

		/* Resume */

		let resumeDetails = resumeScroll.content.addChild(new PIXI.Graphics());
		resumeDetails
			.beginFill(0xe3cdfe, 0.25) /* 0xe3cdfe */
			.drawRect(
				window.innerWidth / 2,
				window.innerHeight / 2,
				resumeScroll.boxWidth / 2,
				resumeScroll.boxHeight
			)
			.endFill();
		const resumeSprite = this.createSprite(
			resumeTexture,
			resumeDetails.width,
			resumeScroll.height * 2.07,
			0.5,
			0.5
		);
		resumeSprite.on('pointerover', () => {
			resumeSprite.tint = 0xafa5b5;
		});
		resumeSprite.on('pointerout', () => {
			resumeSprite.tint = 0xffffff;
		});
		resumeSprite.on('pointertap', () => {
			window.open('https://jackiefeit94.github.io/Resume/', '_blank');
		});
		resumeScroll.content.addChild(resumeSprite);
		resumeScroll.update();
	}

	render() {
		return <div></div>;
	}
}
