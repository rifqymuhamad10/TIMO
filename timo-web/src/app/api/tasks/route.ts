// src/app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import type { TaskFormData, TaskFilter } from '@/types';

// GET /api/tasks → ambil semua task milik user
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const mata_kuliah = searchParams.get('mata_kuliah');
  const prioritas = searchParams.get('prioritas');

  // Ambil user dari session
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  let query = supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Apply filters
  if (status) query = query.eq('status', status);
  if (mata_kuliah) query = query.eq('mata_kuliah', mata_kuliah);
  if (prioritas) query = query.eq('prioritas', prioritas);

  const { data, error } = await query;
  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 });

  return NextResponse.json({ data, error: null });
}

// POST /api/tasks → buat task baru
export async function POST(req: NextRequest) {
  const body: TaskFormData = await req.json();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert([{ ...body, user_id: user.id }])
    .select()
    .single();

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  return NextResponse.json({ data, error: null }, { status: 201 });
}