import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (
    url.pathname === '/hotels' || 
    url.pathname.startsWith('/hotels/') ||  
    url.pathname.startsWith('/_next') ||    
    url.pathname.startsWith('/api') ||      
    url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|avif|ttf|woff|woff2|otf)$/) 
  ) {
    return NextResponse.next();  
  }
  url.pathname = '/hotels';
  return NextResponse.redirect(url);
}

