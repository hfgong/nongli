document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("gregorian-date");
  const today = new Date();
  dateInput.valueAsDate = today;
  updateLunar(today);

  dateInput.addEventListener("change", () => {
    const selectedDate = new Date(dateInput.value);
    updateLunar(selectedDate);
  });

  function updateLunar(date) {
    const lunar = Lunar.fromDate(date);
    document.getElementById("lunar-date").innerText = `农历 ${lunar.lunarMonth}月${lunar.lunarDay}日`;
    document.getElementById("festival").innerText = lunar.festival ? `节日：${lunar.festival}` : '';
    document.getElementById("jieqi").innerText = lunar.jieqi ? `节气：${lunar.jieqi}` : '';
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
});
