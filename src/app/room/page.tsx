'use client';

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';

import '@livekit/components-styles';

import { useState } from 'react';
import { Track } from 'livekit-client';

export default function Page() {
  const [room, setRoom] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [token, setToken] = useState<string>('');


  const getToken = async () => {
    const resp = await fetch(`/api/token?room=${room}&username=${name}`);
    const data = await resp.json();
    setToken(data.token);
  }
  if (token === '') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md p-8">
          <h1 className="text-4xl font-bold text-foreground/90">
            Unirse a sala
          </h1>
          
          <form onSubmit={(e) =>{
            e.preventDefault();
            getToken();
          }} 
          className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="room" className="text-foreground/70 text-sm font-medium">
                Nombre de la sala
              </label>
              <input 
                type="text" 
                id="room"
                name="room" 
                value={room} 
                onChange={(e) => setRoom(e.target.value)}
                className="px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/10 
                  focus:border-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/20
                  transition-colors duration-200"
                placeholder="Ingresa el nombre de la sala"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-foreground/70 text-sm font-medium">
                Tu nombre
              </label>
              <input 
                type="text" 
                id="name"
                name="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/10 
                  focus:border-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/20
                  transition-colors duration-200"
                placeholder="Ingresa tu nombre"
              />
            </div>

            <button 
              type="submit"
              className="mt-4 px-8 py-4 text-lg font-medium text-background bg-foreground/90 rounded-lg 
                hover:bg-foreground/70 transition-colors duration-200 
                shadow-lg hover:shadow-xl"
            >
              Entrar a la sala
            </button>
          </form>
        </div>
      </div>
    );
  }
  const serverUrl = "wss://live-4u2mlfwx.livekit.cloud"

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={serverUrl}
      onDisconnected={()=>{
        setToken('');
      }}
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      <ParticipantTile />
    </GridLayout>
  );
}