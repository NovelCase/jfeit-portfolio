import React from 'react';
import * as PixiApp from '../pixi/mainStage.js';
import * as PIXI from 'pixi.js';
import { Scrollbox } from 'pixi-scrollbox';
import { text } from '../data';

let projectScroll;
export const openProjLink = () => {
	PixiApp.projectContainer.visible = true;
};
export default class Project extends React.Component {
	createPopUpRect(x, y, width, height) {
		const rect = new PIXI.Graphics();
		rect.beginFill(0xe3cdfe).drawRect(x, y, width, height).endFill();
		rect.visible = true; //set to false when I have click functionality
		PixiApp.projectContainer.addChild(rect);
		const blur = new PIXI.filters.BlurFilter(3, 4);
		rect.filters = [blur];
		const bar = new PIXI.Graphics();
		bar
			.beginFill(0x1d0046)
			.drawRect(x, y, width, height / 22)
			.endFill();
		bar.visible = true; //set to false when I have click functionality
		PixiApp.projectContainer.addChild(bar);
		const close = new PIXI.Graphics();
		close
			.beginFill(0xe5699d)
			.drawCircle(x * 1.16, y * 1.85, 15)
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
		PixiApp.projectContainer.addChild(close);
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
		projectScroll.content.addChild(sprite);
		return sprite;
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
		projectScroll.content.addChild(text);
		return text;
	}

	componentDidMount() {
		let [projectPopUp, projectBar, projectClose] = this.createPopUpRect(
			window.innerWidth / 8,
			(window.innerHeight / 4) * 0.1,
			(window.innerWidth / 4) * 3,
			(window.innerHeight / 4) * 3.8
		);

		projectClose.on('click', () => {
			PixiApp.projectContainer.visible = false;
			PixiApp.folderSpriteTwo.visible = true;
		});
		projectClose.on('tap', () => {
			PixiApp.projectContainer.visible = false;
			PixiApp.folderSpriteTwo.visible = true;
		});

		/* FIX THE TITLE CAN'T SET AS CHILD OF PROJECT SCROLL */
		let projectTitle = new PIXI.Text('Projects', {
			fontSize: 45,
			fontFamily: 'Gloria Hallelujah',
		});
		projectTitle.visible = true; //set to false when I have click functionality
		projectTitle.position.x = (projectPopUp.width / 4) * 2.43;
		projectTitle.position.y = projectPopUp.height / 9;
		PixiApp.projectContainer.addChild(projectTitle);

		projectScroll = PixiApp.projectContainer.addChild(
			new Scrollbox({
				boxWidth: (projectPopUp.width / 4) * 3.6,
				boxHeight: (projectPopUp.height / 4) * 3.2,
			})
		);
		projectScroll.position.set(
			projectPopUp.width / 4.55,
			projectPopUp.height / 5
		);

		let projectDetails = projectScroll.content.addChild(new PIXI.Graphics());
		projectDetails
			.beginFill(0xe3cdfe, 0.25) /* 0xe3cdfe */
			.drawRect(
				0,
				0,
				(projectScroll.boxWidth / 2) * 1.977,
				projectScroll.boxHeight * 2.4
			)
			.endFill();
		projectScroll.update();

		/* TEXTURES */

		const weatherTexture = PIXI.Texture.from(
			'siteAssets/projects/WeatherWatcher.png'
		);
		const leafTexture = PIXI.Texture.from('siteAssets/projects/sketch-pad.png');
		const spyTexture = PIXI.Texture.from('siteAssets/projects/SpyQL.png');
		const woofTexture = PIXI.Texture.from('siteAssets/projects/Hallowoof.png');

		/* WEATHER WATCHER */
		const weatherWatcher = this.createSprite(
			weatherTexture,
			(projectDetails.width / 4) * 1.1,
			(projectDetails.height / 4) * 0.57,
			0.5
		);

		const weatherLeaf = this.createSprite(
			leafTexture,
			(projectDetails.width / 4) * 3.1,
			weatherWatcher.y,
			0.7,
			0.7
		);

		const weatherTitle = this.createText(
			text.weatherWatcher.name,
			{ fontSize: 25, fontFamily: 'Gloria Hallelujah' },
			weatherLeaf.x * 0.85,
			weatherLeaf.y * 0.7
		);

		const weatherDescription = this.createText(
			text.weatherWatcher.description,
			{
				fontSize: 20,
				fontFamily: 'Gloria Hallelujah',
				wordWrap: true,
				wordWrapWidth: projectDetails.width / 4.7,
			},
			weatherLeaf.x * 0.9,
			weatherLeaf.y * 0.9
		);

		const weatherGithub = this.createText(
			text.weatherWatcher.linkOne,
			{ fontSize: 15, fontFamily: 'Gloria Hallelujah' },
			weatherLeaf.x * 0.9,
			weatherLeaf.y * 1.7,
			true
		);
		weatherGithub.on('click', () =>
			window.open(text.weatherWatcher.linkOneUrl)
		);
		weatherGithub.on('tap', () =>
			window.open(`${text.weatherWatcher.linkOneUrl} `)
		);

		const weatherWalkThrough = this.createText(
			`  ${text.weatherWatcher.linkTwo}`,
			{ fontSize: 15, fontFamily: 'Gloria Hallelujah' },
			weatherLeaf.x * 0.98,
			weatherLeaf.y * 1.7,
			true
		);
		weatherWalkThrough.on('click', () =>
			window.open(text.weatherWatcher.linkTwoUrl)
		);
		weatherWalkThrough.on('tap', () =>
			window.open(text.weatherWatcher.linkTwoUrl)
		);

		/* SPYQL */
		const spyQL = this.createSprite(
			spyTexture,
			weatherWatcher.x * 2.6,
			weatherLeaf.y * 3.3,
			0.45
		);

		const spyLeaf = this.createSprite(
			leafTexture,
			weatherWatcher.x * 0.7,
			spyQL.y,
			0.7,
			0.7
		);

		const spyQLTitle = this.createText(
			text.spyQL.name,
			{ fontSize: 25, fontFamily: 'Gloria Hallelujah' },
			spyLeaf.x * 0.75,
			spyLeaf.y * 0.92
		);

		const spyQLDescription = this.createText(
			text.spyQL.description,
			{
				fontSize: 20,
				fontFamily: 'Gloria Hallelujah',
				wordWrap: true,
				wordWrapWidth: projectDetails.width / 4,
			},
			spyLeaf.x * 0.5,
			spyLeaf.y * 0.98
		);

		const spyQLGithub = this.createText(
			text.spyQL.linkOne,
			{ fontSize: 15, fontFamily: 'Gloria Hallelujah' },
			spyLeaf.x * 0.4,
			spyLeaf.y * 1.2,
			true
		);
		spyQLGithub.on('click', () => window.open(text.spyQL.linkOneUrl));
		spyQLGithub.on('tap', () => window.open(text.spyQL.linkOneUrl));

		const spyQLWalkThrough = this.createText(
			`${text.spyQL.linkTwo}`,
			{ fontSize: 15, fontFamily: 'Gloria Hallelujah' },
			spyLeaf.x * 0.8,
			spyLeaf.y * 1.2,
			true
		);
		spyQLWalkThrough.on('click', () => window.open(text.spyQL.linkTwoUrl));
		spyQLWalkThrough.on('tap', () => window.open(text.spyQL.linkTwoUrl));

		const spyQLDeployed = this.createText(
			`${text.spyQL.linkThree}`,
			{ fontSize: 15, fontFamily: 'Gloria Hallelujah' },
			spyLeaf.x * 1.4,
			spyLeaf.y * 1.2,
			true
		);
		spyQLDeployed.on('click', () => window.open(text.spyQL.linkThreeUrl));
		spyQLDeployed.on('tap', () => window.open(text.spyQL.linkThreeUrl));

		/* HALLOWOOF */
		const halloWoof = this.createSprite(
			woofTexture,
			weatherWatcher.x,
			weatherWatcher.y * 5.75,
			0.5
		);

		const hallowLeaf = this.createSprite(
			leafTexture,
			weatherLeaf.x,
			halloWoof.y,
			0.7,
			0.7
		);

		const halloWoofTitle = this.createText(
			text.hallowoof.name,
			{ fontSize: 25, fontFamily: 'Gloria Hallelujah' },
			hallowLeaf.x * 0.9,
			hallowLeaf.y * 0.95
		);

		const halloWoofDescription = this.createText(
			text.hallowoof.description,
			{
				fontSize: 20,
				fontFamily: 'Gloria Hallelujah',
				wordWrap: true,
				wordWrapWidth: projectDetails.width / 4,
			},
			hallowLeaf.x * 0.865,
			hallowLeaf.y * 0.99
		);

		const halloWoofGithub = this.createText(
			text.hallowoof.linkOne,
			{ fontSize: 15, fontFamily: 'Gloria Hallelujah' },
			hallowLeaf.x * 0.88,
			hallowLeaf.y * 1.12,
			true
		);
		halloWoofGithub.on('click', () => window.open(text.hallowoof.linkOneUrl));
		halloWoofGithub.on('tap', () => window.open(text.hallowoof.linkOneUrl));

		const halloWoofDeployed = this.createText(
			`${text.hallowoof.linkTwo}`,
			{ fontSize: 15, fontFamily: 'Gloria Hallelujah' },
			hallowLeaf.x * 0.985,
			hallowLeaf.y * 1.12,
			true
		);
		halloWoofDeployed.on('click', () => window.open(text.hallowoof.linkTwoUrl));
		halloWoofDeployed.on('tap', () => window.open(text.hallowoof.linkTwoUrl));
	}
	render() {
		return <div></div>;
	}
}
