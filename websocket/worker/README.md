# WebSocket Worker for Whiteboard App

This directory contains the Cloudflare Worker and Durable Object code for real-time collaboration and asset management in the Whiteboard App. It is written in TypeScript and uses the itty-router library for routing.

## Overview

- **worker.ts**: Main entry point for the Cloudflare Worker. Handles HTTP/WebSocket routing, CORS, and delegates requests to the appropriate handlers or Durable Object.
- **TldrawDurableObject.ts**: Implements a Durable Object for each whiteboard room, managing real-time state and WebSocket connections. Persists room state to R2 storage.
- **assetUploads.ts**: Handles asset (image/video) uploads and downloads to/from R2 storage, including caching and CORS headers.
- **types.ts**: Type definitions for the Worker environment, including R2 bucket and Durable Object bindings.

## Features

- **Real-time Collaboration**: Each whiteboard room is managed by a Durable Object, which keeps the room state in memory and syncs changes between connected clients via WebSockets.
- **Asset Upload/Download**: Users can upload images and videos to the R2 bucket. Assets are served with proper caching and CORS headers for efficient and secure access.
- **Board Existence Check**: Before connecting to a room, the worker checks if the board exists via an external API call.
- **CORS Support**: All endpoints are CORS-enabled for cross-origin requests.
- **Caching**: Asset downloads are cached for performance, with immutable cache headers.

## Endpoints

### WebSocket/Realtime
- `GET /connect/:roomId`  
  Proxies the connection to the Durable Object for the specified room. Only allows connection if the board exists.

### Asset Management
- `POST /uploads/:uploadId`  
  Upload an image or video asset. Only accepts `image/*` or `video/*` content types. Returns 409 if the asset already exists.
- `GET /uploads/:uploadId`  
  Download an asset. Supports range requests and caches responses for performance.

### Unfurling
- `GET /unfurl`  
  Extracts metadata from pasted URLs (for bookmarks, etc.).

## Durable Object: TldrawDurableObject
- Manages a single whiteboard room's state and WebSocket connections.
- Persists room state to R2 every 10 seconds (throttled).
- Handles new connections and room initialization.

## Environment Bindings (see `wrangler.toml`)
- `TLDRAW_BUCKET`: R2 bucket for storing assets and room snapshots.
- `TLDRAW_DURABLE_OBJECT`: Durable Object namespace for rooms.
- `API_URL`: (injected) URL for checking board existence.

## Development
- Written in TypeScript.
- Uses itty-router for routing and CORS.
- See `wrangler.toml` for deployment configuration.

## Example Usage
- Upload an asset:
  ```sh
  curl -X POST -H "content-type: image/png" --data-binary @myimage.png https://<worker-url>/uploads/my-upload-id
  ```
- Download an asset:
  ```sh
  curl https://<worker-url>/uploads/my-upload-id
  ```
- Connect to a room (WebSocket):
  ```js
  const ws = new WebSocket('wss://<worker-url>/connect/room-123?sessionId=abc');
  ```

---
For more details, see the code in each file.
