import { useSync } from '@tldraw/sync';
import { Tldraw } from 'tldraw';
import { getBookmarkPreview } from './getBookmarkPreview';
import { multiplayerAssetStore } from './multiplayerAssetStore';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoadingScreen } from 'tldraw';
import Sidebar from "../Sidebar"

const WORKER_URL = process.env.REACT_APP_TLDRAW_WORKER_URL;

function Board() {
	const { roomId } = useParams();
	const [boardExists, setBoardExists] = useState(null);
	useEffect(() => {
		const checkBoardExists = async () => {
			const apiUrl = `${process.env.REACT_APP_API_URL}/exists?boardId=${roomId}`;
			try {
				const response = await fetch(apiUrl);
				const data = await response.json();
				setBoardExists(data.exists);
			} catch (error) {
				console.error('Error checking board existence:', error);
				setBoardExists(false);
			}
		};

		checkBoardExists();
	}, [roomId]);

	const store = useSync({
		uri: `${WORKER_URL}/connect/${roomId}`,
		assets: multiplayerAssetStore,
	});

	if (boardExists === false) {
		alert('Board does not exist!');
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
			/>
		</div>
	);
}

export default Board;