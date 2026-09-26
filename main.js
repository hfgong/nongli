document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("gregorian-date");

  // Use local-date components: new Date("YYYY-MM-DD") and valueAsDate are UTC-based
  // and can shift the date by one day depending on the time zone.
  const pad = n => String(n).padStart(2, "0");
  const today = new Date();
  dateInput.value = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  updateLunar(today.getFullYear(), today.getMonth() + 1, today.getDate());

  dateInput.addEventListener("change", () => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateInput.value);
    if (m) updateLunar(+m[1], +m[2], +m[3]);
  });

  function updateLunar(year, month, day) {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();
    const festivals = [...lunar.getFestivals(), ...solar.getFestivals()];
    const jieqi = lunar.getJieQi();

    document.getElementById("lunar-date").innerText =
      `农历${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
    document.getElementById("ganzhi").innerText =
      `${lunar.getYearInGanZhi()}年（${lunar.getYearShengXiao()}年）`;
    document.getElementById("festival").innerText = festivals.length ? `节日：${festivals.join("、")}` : "";
    document.getElementById("jieqi").innerText = jieqi ? `节气：${jieqi}` : "";
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
});
