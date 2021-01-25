import React from 'react';
import ReactDOM from 'react-dom';
import '../public/style.css';
import AboutMe from './AboutMe';
// import * as PixiApp from '../pixi/app.js';
import Main from './MainView';
import Project from './ProjectView';
// import socket from "socket.io-client";

// const clientSocket = socket(window.location.origin);

// clientSocket.on("connect", () => {
// 	console.log("Connected to server");
// });

ReactDOM.render(
	<div>
		<Main />
		<AboutMe />
		<Project />
		{/* <h1>Outside of canvas</h1> */}
	</div>,
	document.getElementById('app')
);
