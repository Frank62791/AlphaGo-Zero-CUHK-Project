import asyncio
import websockets

async def echo(websocket, path):
    async for message in websocket:
        print(message)
        await websocket.send(message)

async def main():
    async with websockets.serve(echo, "localhost", 8000):
        await asyncio.Future()  # keep the server running indefinitely

asyncio.run(main())