import React from 'react';
import ReactDOM from 'react-dom';
import '../public/style.css';
import AboutMe from './AboutMe';
// import * as PixiApp from '../pixi/app.js';
import Project from './ProjectView';
import HeadShot from './HeadShot';
import Resume from './Resume';
import Spotify from './Spotify';
// import socket from "socket.io-client";

// const clientSocket = socket(window.location.origin);

// clientSocket.on("connect", () => {
// 	console.log("Connected to server");
// });

ReactDOM.render(
	<div>
		<Spotify />
		<AboutMe />
		<Project />
		<Resume />
		<HeadShot />
	</div>,
	document.getElementById('app')
);
