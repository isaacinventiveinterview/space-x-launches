export function getMonthDayTime(date: string | null | undefined, seconds?: boolean, useComma?: boolean) {
  if (date) {
    const d = new Date(date);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const day = `${d.toLocaleString("default", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: timeZone,
    })}`;
    const time = `${d.toLocaleString("default", {
      hour: "2-digit",
      minute: "2-digit",
      second: seconds ? "2-digit" : undefined,
      timeZone: timeZone,
    })}`;

    return useComma ? `${day}, ${time}` : `${day} \u25CF ${time}`;
  } else {
    return "";
  }
}
