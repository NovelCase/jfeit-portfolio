import React from 'react';
import * as PixiApp from '../pixi/mainStage.js';
import * as PIXI from 'pixi.js';

let width = PixiApp.appWidth;
let height = PixiApp.appHeight;

export default class Spotify extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
		};
		this.onClickTap = this.onClickTap.bind(this);
	}
	componentDidMount() {
		const spotify = PIXI.Texture.from('/siteAssets/welcome/SpotifyBW.png');

		let spotifySprite = PixiApp.createHomeSprite(
			width / 4 + 400,
			height / 1.1,
			spotify
		);
		spotifySprite.scale.set(0.5);

		spotifySprite.on('click', () => {
			this.onClickTap();
		});
		spotifySprite.on('tap', () => this.onClickTap());
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
						src='https://open.spotify.com/embed/playlist/4g5cH2RUqVMbQt9BzcaYEl'
						width={width / 4}
						height={height}
						// frameborder='0'
						allowtransparency='true'
						allow='encrypted-media'
					></iframe>
				) : (
					<div />
				)}
			</div>
		);
	}
}
