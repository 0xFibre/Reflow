import { secondsToMinutes, secondsToHours, minutesToHours } from "date-fns";

export const date = {
  getHtmlDateValue(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1);
    const d = String(date.getDate());

    return `${y}-${m.length < 2 ? "0" + m : m}-${d.length < 2 ? "0" + d : d}`;
  },

  getHtmlTimeValue(date: Date) {
    const h = String(date.getHours());
    const m = String(date.getMinutes());

    return `${h.length < 2 ? "0" + h : h}:${m.length < 2 ? "0" + m : m}`;
  },

  formatDuration(startTime: number, endTime: number) {
    const secs = endTime - startTime;
    if (secs < 60) {
      return `${secs} secs`;
    }

    const mins = Math.round(secs / 60);
    if (mins < 60) {
      return `${mins} mins`;
    }

    const hours = Math.round(mins / 60);
    if (hours < 60) {
      return `${hours} hours`;
    }

    const days = Math.round(hours / 24);
    if (days < 24) {
      return `${days} days`;
    }
  },
};
