import { handleUnfurlRequest } from 'cloudflare-workers-unfurl'
import { AutoRouter, cors, error, IRequest } from 'itty-router'
import { handleAssetDownload, handleAssetUpload } from './assetUploads'
import { Environment } from './types'

// make sure our sync durable object is made available to cloudflare
export { TldrawDurableObject } from './TldrawDurableObject'

// we use itty-router (https://itty.dev/) to handle routing. in this example we turn on CORS because
// we're hosting the worker separately to the client. you should restrict this to your own domain.
const { preflight, corsify } = cors({ origin: '*' })
const router = AutoRouter<IRequest, [env: Environment, ctx: ExecutionContext]>({
	before: [preflight],
	finally: [corsify],
	catch: (e) => {
		console.error(e)
		return error(e)
	},
})
	// requests to /connect are routed to the Durable Object, and handle realtime websocket syncing
    .get('/connect/:roomId', async (request, env) => {
        const roomId = request.params.roomId
        const apiUrl = `${env.API_URL}?boardId=${roomId}`

        try {
            // Check if the board exists
            const response = await fetch(apiUrl)
            if (!response.ok) {
                console.error(`Failed to check board existence: ${response.statusText}`)
                return new Response('Failed to check board existence', { status: 500 })
            }

            const data = await response.json()
            if (!data.exists) {
                // If the board does not exist, deny the connection
                return new Response('Board does not exist', { status: 404 })
            }

            // If the board exists, proceed with the connection
            const id = env.TLDRAW_DURABLE_OBJECT.idFromName(roomId)
            const room = env.TLDRAW_DURABLE_OBJECT.get(id)
            return room.fetch(request.url, { headers: request.headers, body: request.body })
        } catch (error) {
            console.error('Error checking board existence:', error)
            return new Response('Failed to check board existence', { status: 500 })
        }
    })

	// assets can be uploaded to the bucket under /uploads:
	.post('/uploads/:uploadId', handleAssetUpload)

	// they can be retrieved from the bucket too:
	.get('/uploads/:uploadId', handleAssetDownload)

	// bookmarks need to extract metadata from pasted URLs:
	.get('/unfurl', handleUnfurlRequest)

	

// export our router for cloudflare
export default router
