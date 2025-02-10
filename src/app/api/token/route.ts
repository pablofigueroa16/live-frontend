import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

// Do not cache endpoint result
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get('room');
  const username = req.nextUrl.searchParams.get('username');
  if (!room) {
    return NextResponse.json({ error: 'Missing "room" query parameter' }, { status: 400 });
  } else if (!username) {
    return NextResponse.json({ error: 'Missing "username" query parameter' }, { status: 400 });
  }

  const apiKey = "APIZB8EfDBPauqK"
  const apiSecret = "wcRBpxAqeUHUwx7Z7xX8TZf3Uu4exnex8huesODcAfRM"
  const wsUrl = "wss://live-4u2mlfwx.livekit.cloud"

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: username });
  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

  return NextResponse.json(
    { token: await at.toJwt() },
    { headers: { "Cache-Control": "no-store" } },
  );
}