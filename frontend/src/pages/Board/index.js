import { useSync } from '@tldraw/sync';
import { Tldraw, useTldrawUser } from 'tldraw'
import { getBookmarkPreview } from './getBookmarkPreview';
import { multiplayerAssetStore } from './multiplayerAssetStore';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { LoadingScreen } from 'tldraw';
import Sidebar from './Sidebar';
import { useAppContext } from "../../libs/contextLib";

function Board() {
	const { username } = useAppContext();
	const [boardExists, setBoardExists] = useState(null);
	const [guestname, setGuestname] = useState('');
	let { token } = useParams();

	const isFirstTimestamp = useRef(true);

	const isTeacher = token.includes("teacher=true");
	if (isTeacher) {
		token = token.split("&")[0];
	}

	const roomId = token.slice(0, 12);

	const [userPreferences, setUserPreferences] = useState({
		id: token,
		name: guestname,
	});

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

	// Timestamp reporting mechanism
	useEffect(() => {
		if (!boardExists || !token) return;

		const reportTimestamp = async (appendValue) => {
			try {
				await fetch(`${process.env.REACT_APP_API_URL}/timestamp`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						token,
						append: appendValue,
					}),
				});
			} catch (err) {
				console.error('Failed to update timestamp:', err);
			}
		};

		// Report first timestamp (new timestamp)
		if (isFirstTimestamp.current) {
			reportTimestamp(false);
			isFirstTimestamp.current = false;
		}

		const interval = setInterval(() => {
			reportTimestamp(true); // increment counter on the latest timestamp
		}, 60000);

		return () => clearInterval(interval);
	}, [boardExists, token]);

	const user = useTldrawUser({ userPreferences, setUserPreferences });

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