import asyncio
import websockets
from fight import Fight
import json
import ssl

ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ssl_context.load_cert_chain("/etc/letsencrypt/live/cuhk.games/fullchain.pem", keyfile="/etc/letsencrypt/live/cuhk.games/privkey.pem")

async def echo(websocket: websockets, path):

    client_address = websocket.remote_address
    
    async for message in websocket:
        if message == "start":
            started = True
            fight = Fight()

            print(f"Received message from {client_address[1]}: {message}")
            print(fight.get_board())
            value = fight.get_board()
            await websocket.send(json.dumps((value)))
            
        elif started:

            return_message = fight.play(message)
            if fight.game_end() != False:
                started = False
                await websocket.send(json.dumps(fight.game_end()))
            else:
                await websocket.send(json.dumps((return_message)))
                


async def main():
    async with websockets.serve(echo, "cuhk.games", 8000, ssl = ssl_context):
        await asyncio.Future()  # keep the server running indefinitely

asyncio.run(main())
