import React from 'react';
import * as PixiApp from '../pixi/mainStage.js';
import * as PIXI from 'pixi.js';
const { Sprite } = require('pixi.js');

let width = PixiApp.appWidth;
let height = PixiApp.appHeight;
const spotifyContainer = PixiApp.spotifyContainer;

export default class Spotify extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
		};
		this.onClickTap = this.onClickTap.bind(this);
	}
	componentDidMount() {
		const spotify = PIXI.Texture.from('/siteAssets/welcome/Spotify-purp.png');
		const spotifyHover = PIXI.Texture.from(
			'/siteAssets/welcome/Spotify-inverted.png'
		);
		const spotifySprite = new Sprite(spotify);
		spotifyContainer.addChild(spotifySprite);
		spotifySprite.anchor.set(0.5);
		spotifySprite.position.x = width / 4 + 400;
		spotifySprite.position.y = height / 1.1;
		spotifySprite.interactive = true;
		spotifySprite.buttonMode = true;

		spotifySprite.scale.set(0.3);

		spotifySprite.on('pointertap', () => {
			this.onClickTap();
		});
		spotifySprite.on('pointerover', function (event) {
			this.texture = spotifyHover;
		});
		spotifySprite.on('pointerout', function (event) {
			this.texture = spotify;
		});
	}

	onClickTap() {
		if (this.state.visible) {
			this.setState({ visible: false });
			//PixiApp.app.stage.pivot.x = width * 3;
			PixiApp.app.renderer.view.width += width / 4;
			console.log('was visible');
		} else {
			this.setState({ visible: true });
			PixiApp.app.renderer.view.width -= width / 4;
			console.log('was not visible');
		}
	}

	render() {
		return (
			<div>
				{this.state.visible ? (
					<iframe
						src="https://open.spotify.com/embed/playlist/4g5cH2RUqVMbQt9BzcaYEl"
						width={width / 4}
						height={height}
						// frameborder='0'
						allowtransparency="true"
						allow="encrypted-media"
					></iframe>
				) : (
					<div />
				)}
			</div>
		);
	}
}
