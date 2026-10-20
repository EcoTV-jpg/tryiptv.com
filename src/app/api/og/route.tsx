
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // ?title=<title>
  const hasTitle = searchParams.has('title');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'TryIPTV';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
          color: 'white',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '48px', fontWeight: 'bold' }}>
           <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: '#00FF7F' }}
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.51 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
          <span style={{
            background: 'linear-gradient(to right, #00FF7F, #00BFFF)',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            TryIPTV
          </span>
        </div>
        <p
          style={{
            fontSize: 60,
            fontWeight: 800,
            textAlign: 'center',
            padding: '0 50px',
            lineHeight: 1.2
          }}
        >
          {title}
        </p>
        <p style={{ fontSize: 24, color: '#A0A0A0', marginTop: '20px' }}>
          IPTV streaming for compatible devices and supported player apps.
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    }
  );
}
