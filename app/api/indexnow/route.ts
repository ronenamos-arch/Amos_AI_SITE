import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'f9826b1b81c34964b0fa14797b4af314';
const SITE_URL = 'ronenamoscpa.co.il';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'URLs array required' },
        { status: 400 }
      );
    }

    const indexNowPayload = {
      host: SITE_URL,
      key: INDEXNOW_KEY,
      keyLocation: `https://${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(indexNowPayload)
    });

    if (response.ok) {
      console.log('✅ IndexNow: URLs submitted successfully', urls);
      return NextResponse.json({ 
        success: true, 
        urls,
        message: 'URLs submitted to search engines'
      });
    } else {
      const errorText = await response.text();
      console.error('❌ IndexNow API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'IndexNow API error', status: response.status },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('❌ IndexNow error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
