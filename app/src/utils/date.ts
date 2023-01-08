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
};
