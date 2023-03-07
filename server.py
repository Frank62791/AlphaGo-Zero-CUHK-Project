import asyncio
import websockets

async def echo(websocket, path):

    client_address = websocket.remote_address

    async for message in websocket:
        print(f"Received message from {client_address[1]}: {message}")
        await websocket.send(str(client_address))

async def main():
    async with websockets.serve(echo, "localhost", 8000):
        await asyncio.Future()  # keep the server running indefinitely

asyncio.run(main())