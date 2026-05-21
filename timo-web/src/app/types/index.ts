// src/types/index.ts

export type Prioritas = 'rendah' | 'sedang' | 'tinggi';

export type StatusTugas =
  | 'belum_dimulai'
  | 'sedang_dikerjakan'
  | 'selesai';

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at?: string;
}

export interface Task {
  id: string;
  user_id: string;
  judul: string;
  deskripsi?: string;
  mata_kuliah?: string;
  tenggat_waktu?: string; // ISO 8601: YYYY-MM-DD
  prioritas: Prioritas;
  status: StatusTugas;
  created_at: string;
  updated_at?: string;
}

// Untuk form tambah/edit task (tanpa id & user_id)
export type TaskFormData = Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

// Untuk filter
export interface TaskFilter {
  status?: StatusTugas;
  mata_kuliah?: string;
  prioritas?: Prioritas;
}

// Response dari API
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}