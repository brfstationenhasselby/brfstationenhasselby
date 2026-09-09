/* Bokningar redigeras i booking-data på gastlagenhet.html. Inga personuppgifter. */
(() => {
  const DAY = 86400000;
  const parseDate = (value) => {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error("Ogiltigt datum");
    const date = new Date(value + "T00:00:00Z");
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error("Ogiltigt datum");
    return date.getTime();
  };
  const calendar = document.getElementById("booking-calendar");
  const nights = new Set();
  try {
    const data = JSON.parse(document.getElementById("booking-data").textContent);
    if (!Array.isArray(data.bookings)) throw new Error("Bokningslistan saknas");
    const updated = parseDate(data.updated);
    for (const booking of data.bookings) {
      const start = parseDate(booking.arrival);
      const end = parseDate(booking.departure);
      if (end <= start || end - start > 366 * DAY) throw new Error("Ogiltigt datumintervall");
      for (let day = start; day < end; day += DAY) {
        if (nights.has(day)) throw new Error("Överlappande bokningar");
        nights.add(day);
      }
    }
    document.getElementById("calendar-status").textContent = "Senast uppdaterad " + new Intl.DateTimeFormat("sv-SE", { dateStyle: "long", timeZone: "UTC" }).format(new Date(updated)) + ".";
  } catch {
    document.getElementById("calendar-fallback").textContent = "Bokningskalendern kan inte visas just nu. Kontakta styrelsen för aktuellt bokningsläge.";
    return;
  }
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Stockholm", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const month = new Date(today + "T00:00:00Z");
  month.setUTCDate(1);
  const format = new Intl.DateTimeFormat("sv-SE", { month: "long", year: "numeric", timeZone: "UTC" });
  const dayFormat = new Intl.DateTimeFormat("sv-SE", { dateStyle: "long", timeZone: "UTC" });
  function render() {
    document.getElementById("calendar-month").textContent = format.format(month);
    const offset = (month.getUTCDay() + 6) % 7;
    const count = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();
    const rows = [];
    for (let cell = 0; cell < Math.ceil((offset + count) / 7) * 7; cell++) {
      if (cell % 7 === 0) rows.push("<tr>");
      const day = cell - offset + 1;
      if (day < 1 || day > count) rows.push('<td class="calendar-empty"></td>');
      else {
        const date = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), day));
        const booked = nights.has(date.getTime());
        const isToday = date.toISOString().slice(0, 10) === today;
        rows.push(`<td${booked ? ' class="calendar-booked"' : ""}><span${isToday ? ' aria-current="date"' : ""} aria-label="${dayFormat.format(date)}${booked ? ", bokat" : ", ingen bokning registrerad"}">${day}${booked ? '<span class="calendar-dot" aria-hidden="true">●</span>' : ""}</span></td>`);
      }
      if (cell % 7 === 6) rows.push("</tr>");
    }
    document.getElementById("calendar-days").innerHTML = rows.join("");
  }
  document.getElementById("previous-month").addEventListener("click", () => { month.setUTCMonth(month.getUTCMonth() - 1); render(); });
  document.getElementById("next-month").addEventListener("click", () => { month.setUTCMonth(month.getUTCMonth() + 1); render(); });
  render();
  calendar.hidden = false;
  document.getElementById("calendar-fallback").hidden = true;
})();
