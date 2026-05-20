// Contoh helpers yang berguna untuk Tsulsi di UI
export const getPrioritasColor = (prioritas: string) => {
  const colors = { rendah: 'green', sedang: 'yellow', tinggi: 'red' };
  return colors[prioritas as keyof typeof colors] ?? 'gray';
};

export const getStatusLabel = (status: string) => {
  const labels = {
    belum_dimulai: 'Belum Dimulai',
    sedang_dikerjakan: 'Sedang Dikerjakan',
    selesai: 'Selesai',
  };
  return labels[status as keyof typeof labels] ?? status;
};

export const isDeadlineNear = (tanggal?: string) => {
  if (!tanggal) return false;
  const diff = new Date(tanggal).getTime() - Date.now();
  return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000; // < 3 hari
};

export const isDeadlinePassed = (tanggal?: string) => {
  if (!tanggal) return false;
  return new Date(tanggal).getTime() < Date.now();
};