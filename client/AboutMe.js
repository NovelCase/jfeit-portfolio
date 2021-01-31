import React from 'react';
import * as PixiApp from '../pixi/mainStage.js';
import * as PIXI from 'pixi.js';
import { text } from '../data';
export const openLink = () => {
	popAbout.visible = true;
};
let popAbout;
export default class AboutMe extends React.Component {
	createPopUpRect() {
		const aboutme = PixiApp.aboutContainer;
		let width = (window.innerWidth / 5) * 4;
		let height = window.innerHeight - 100;
		if (window.innerWidth < 400) {
			width = window.innerWidth - 40;
			height = window.innerHeight - 60;
		}
		let x = window.innerWidth / 10;
		let y = 50;
		const rect = new PIXI.Graphics();
		rect.beginFill(0xe0cffc).drawRect(x, y, width, height).endFill();
		//PixiApp.aboutContainer.addChild(PixiApp.folderSpriteOne);
		const blur = new PIXI.filters.BlurFilter(3, 4);
		rect.filters = [blur];
		aboutme.visible = false;
		const topBar = new PIXI.Graphics();
		topBar.beginFill(0x322174).drawRect(x, y, width, 30).endFill();
		const xButton = new PIXI.Graphics();
		xButton
			.beginFill(0xef6a9c)
			.drawCircle(x + 20, y + 15, 10)
			.endFill();
		xButton.interactive = true;
		xButton.buttonMode = true;
		xButton.on('click', () => {
			popAbout.visible = false;
			PixiApp.folderSpriteOne.visible = true;
		});
		aboutme.addChild(rect);
		const apron = new PIXI.Sprite(
			PIXI.Texture.from('/siteAssets/about/Apron.png')
		);
		const jackieNoah = new PIXI.Sprite(
			PIXI.Texture.from('/siteAssets/about/JackieNoah.png')
		);
		let violin = new PIXI.Sprite(
			PIXI.Texture.from('/siteAssets/about/Violin.png')
		);

		apron.position.x = x + 100;
		apron.position.y = height - 150;
		apron.anchor.set(0.5);
		apron.scale.set(0.1, 0.1);
		aboutme.addChild(apron);
		jackieNoah.position.x = width - 25;
		jackieNoah.position.y = height - 100;
		jackieNoah.anchor.set(0.5);
		jackieNoah.scale.set(0.12, 0.12);
		aboutme.addChild(jackieNoah);
		violin.position.x = width - 25;
		violin.position.y = y + 100;
		violin.anchor.set(0.5);

		let titleStyle = {
			fontFamily: 'Nunito Sans',
			fontSize: 35,
			fontWeight: 'bold',
			wordWrap: true,
			wordWrapWidth: (aboutme.width / 3) * 2,
		};
		let descriptionStyle = {
			fontFamily: 'Nunito Sans',
			fontSize: 23,
			fontWeight: '300',
			lineHeight: aboutme.height / 20,
			wordWrap: true,
			wordWrapWidth: (aboutme.width / 3) * 2,
		};

		const title = new PIXI.Text('About Me', titleStyle);
		title.position.x = window.innerWidth / 2;
		title.position.y = aboutme.height / 5;
		title.anchor.set(0.5);
		aboutme.addChild(title);
		const desc = new PIXI.Text(text.about.description, descriptionStyle);
		desc.position.x = window.innerWidth / 2;
		desc.position.y = aboutme.height / 2.5;
		desc.anchor.set(0.5);
		aboutme.addChild(desc);
		aboutme.addChild(violin);
		aboutme.addChild(topBar);
		aboutme.addChild(xButton);
		return aboutme;
	}
	componentDidMount() {
		popAbout = this.createPopUpRect();
	}
	render() {
		return <div></div>;
	}
}
