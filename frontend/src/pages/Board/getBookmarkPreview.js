import { AssetRecordType, getHashForString } from 'tldraw';


export async function getBookmarkPreview({ url }) {
	// we start with an empty asset record
	const asset = {
		id: AssetRecordType.createId(getHashForString(url)),
		typeName: 'asset',
		type: 'bookmark',
		meta: {},
		props: {
			src: url,
			description: '',
			image: '',
			favicon: '',
			title: '',
		},
	};

	try {
		// try to fetch the preview data from the server
		const response = await fetch(
			`${process.env.REACT_APP_TLDRAW_WORKER_URL}/unfurl?url=${encodeURIComponent(url)}`
		);
		const data = await response.json();

		// fill in our asset with whatever info we found
		asset.props.description = data?.description ?? '';
		asset.props.image = data?.image ?? '';
		asset.props.favicon = data?.favicon ?? '';
		asset.props.title = data?.title ?? '';
	} catch (e) {
		console.error(e);
	}

	return asset;
}
