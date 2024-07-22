// Import necessary types and functions
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// Define the GET function
export async function GET(req: NextRequest) {
  const session = await getServerSession();
  const token = await getToken({ req });
  
  console.log("this is header", token?.access_token);
  console.log("this is second check", token?.access_token);
  console.log("this is third check session", session);

  if (!session || !token?.access_token) {
    return NextResponse.json({ message: 'Not authenticated' });
  }

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/channels');
    url.searchParams.append('part', 'snippet,contentDetails,statistics');
    url.searchParams.append('mine', 'true');
    url.searchParams.append('key', process.env.API_KEY || "");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching channel data:', response.status, response.statusText, errorText);
      throw new Error(`Error fetching channel data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching channel data:', error);
    return NextResponse.json({ message: 'Error fetching channel data', error });
  }
}
