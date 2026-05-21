import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// POST /api/auth → login atau register (pakai ?action=login/register)
export async function POST(req: NextRequest) {
  const { action, email, password } = await req.json();

  if (action === 'register') {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return NextResponse.json({ data: null, error: error.message }, { status: 400 });
    return NextResponse.json({ data, error: null });
  }

  if (action === 'login') {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return NextResponse.json({ data: null, error: error.message }, { status: 401 });
    return NextResponse.json({ data, error: null });
  }

  if (action === 'logout') {
    const { error } = await supabase.auth.signOut();
    if (error) return NextResponse.json({ data: null, error: error.message }, { status: 400 });
    return NextResponse.json({ data: 'logged out', error: null });
  }

  return NextResponse.json({ data: null, error: 'Invalid action' }, { status: 400 });
}