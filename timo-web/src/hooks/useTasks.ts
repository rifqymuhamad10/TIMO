// src/hooks/useTasks.ts
import { useState, useEffect } from 'react';
import type { Task, TaskFormData, TaskFilter } from '@/types';

export function useTasks(filter?: TaskFilter) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter?.status) params.append('status', filter.status);
    if (filter?.mata_kuliah) params.append('mata_kuliah', filter.mata_kuliah);
    if (filter?.prioritas) params.append('prioritas', filter.prioritas);

    const res = await fetch(`/api/tasks?${params}`);
    const json = await res.json();
    if (json.error) setError(json.error);
    else setTasks(json.data);
    setLoading(false);
  };

  const createTask = async (formData: TaskFormData) => { /* POST ke /api/tasks */ };
  const updateTask = async (id: string, formData: Partial<TaskFormData>) => { /* PUT */ };
  const deleteTask = async (id: string) => { /* DELETE */ };

  useEffect(() => { fetchTasks(); }, []);

  return { tasks, loading, error, createTask, updateTask, deleteTask, refetch: fetchTasks };
}