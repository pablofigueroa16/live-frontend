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
    return <form onSubmit={(e) =>{
      e.preventDefault();
      getToken();

    }}>
      <input type="text" name="room" value={room} onChange={(e) => setRoom(e.target.value)} />
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Get Token</button>
    </form>
  }
  const serverUrl = "wss://live-4u2mlfwx.livekit.cloud"
  console.log(serverUrl);

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