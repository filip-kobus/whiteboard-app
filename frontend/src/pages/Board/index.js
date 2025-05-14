import { useSync } from '@tldraw/sync';
import { Tldraw, useTldrawUser } from 'tldraw'
import { getBookmarkPreview } from './getBookmarkPreview';
import { multiplayerAssetStore } from './multiplayerAssetStore';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoadingScreen } from 'tldraw';
import Sidebar from './Sidebar';
import { useAppContext } from "../../libs/contextLib";

	
function Board() {
	const { username } = useAppContext();
	const [boardExists, setBoardExists] = useState(null);
	const [guestname, setGuestname] = useState('');
	let { token } = useParams();

	const isTeacher = token.includes("teacher=true")
	console.log(isTeacher)
	if (isTeacher) {
		token = token.split("&")[0];
	}

	const roomId = token.slice(0, 12);
	useEffect(() => {
		const checkBoardExists = async () => {
			const apiUrl = `${process.env.REACT_APP_API_URL}/verifytoken?token=${token}&teacher=${isTeacher}`;
			try {
				const response = await fetch(apiUrl);
				if (!response.ok) {
					setBoardExists(false);
					return;
				}
				const data = await response.json();
				const resolvedUsername = data.username === "Admin" ? "Teacher" : data.username;
				setGuestname(resolvedUsername);
				setUserPreferences((prev) => ({ ...prev, name: resolvedUsername }));
				setBoardExists(true);
			} catch (error) {
				console.error('Error checking board existence:', error);
				setBoardExists(false);
			}
		};

		checkBoardExists();
	}, [roomId, token, isTeacher, username]);


	const [userPreferences, setUserPreferences] = useState({
		id: token,
		name: guestname,
	});

	const user = useTldrawUser({ userPreferences, setUserPreferences })

	const store = useSync({
		uri: `${process.env.REACT_APP_TLDRAW_WORKER_URL}/connect/${roomId}`,
		assets: multiplayerAssetStore,
		userInfo: userPreferences
	});
	
	if (boardExists === false) {
		alert('Invalid token!');
		window.location.href = '/board';
		return null;
	}
	
	if (boardExists === null) {
		return LoadingScreen({
			message: 'Checking board existence...',
		});
	}

	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Sidebar />
			<Tldraw
				store={store}
				onMount={(editor) => {
					editor.registerExternalAssetHandler('url', getBookmarkPreview);				
				}}
				user={user}
			/>
		</div>
	);
}

export default Board;