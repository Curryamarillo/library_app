// Función para formatear la fecha
export function formatDate(loanDate: Date | number[]) {
    if (Array.isArray(loanDate)) {
      const [year, month, day, hours, minutes, seconds] = loanDate;
      if (seconds === 0) {
        return `${day}/${month}/${year}, ${hours}:${minutes}`;
      } else {
        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
      }
    }
    return (loanDate as Date).toLocaleString(); // Si es Date, usar el formato local por defecto
  }