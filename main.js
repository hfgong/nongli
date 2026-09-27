document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, "0");
  const WEEK = ["日", "一", "二", "三", "四", "五", "六"];

  // Important lunar festivals keyed by "month-day" (leap months never count).
  // 除夕 is the last day of 腊月 (29th or 30th) and is detected via the library.
  const LUNAR_FESTIVALS = {
    "1-1": "春节", "1-15": "元宵节", "2-2": "龙抬头", "5-5": "端午节",
    "7-7": "七夕节", "7-15": "中元节", "8-15": "中秋节", "9-9": "重阳节",
    "12-8": "腊八节", "12-23": "北方小年", "12-24": "南方小年"
  };
  const SOLAR_HOLIDAYS = { "1-1": "元旦", "5-1": "劳动节", "10-1": "国庆节" };
  const FESTIVAL_EMOJI = {
    "春节": "🧧", "元宵节": "🏮", "龙抬头": "🐉", "清明节": "🌿", "端午节": "🛶",
    "七夕节": "💞", "中元节": "🕯️", "中秋节": "🥮", "重阳节": "🌼", "腊八节": "🥣",
    "北方小年": "🥟", "南方小年": "🍬", "除夕": "🧨",
    "元旦": "🎉", "劳动节": "🛠️", "国庆节": "🎊"
  };
  const ZODIAC_EMOJI = {
    "鼠": "🐭", "牛": "🐮", "虎": "🐯", "兔": "🐰", "龙": "🐲", "蛇": "🐍",
    "马": "🐴", "羊": "🐑", "猴": "🐵", "鸡": "🐔", "狗": "🐶", "猪": "🐷"
  };
  // Solar-term emoji by season: 立春–谷雨, 立夏–大暑, 立秋–霜降, 立冬–大寒.
  const TERM_SEASON = {
    "🌸": "立春雨水惊蛰春分清明谷雨", "☀️": "立夏小满芒种夏至小暑大暑",
    "🍂": "立秋处暑白露秋分寒露霜降", "❄️": "立冬小雪大雪冬至小寒大寒"
  };
  const termEmoji = t => Object.keys(TERM_SEASON).find(e => TERM_SEASON[e].includes(t)) || "";
  const CELL_SHORT = { "北方小年": "北小年", "南方小年": "南小年" }; // fit narrow day cells
  const withEmoji = n => FESTIVAL_EMOJI[n] ? `${FESTIVAL_EMOJI[n]} ${n}` : n;

  // All dates are plain {y, m, d} in the device's local calendar.
  const toYmd = dt => ({ y: dt.getFullYear(), m: dt.getMonth() + 1, d: dt.getDate() });
  const same = (a, b) => a.y === b.y && a.m === b.m && a.d === b.d;
  const dayNum = v => Date.UTC(v.y, v.m - 1, v.d) / 86400000;
  const addDays = (v, n) => {
    const dt = new Date(Date.UTC(v.y, v.m - 1, v.d + n));
    return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
  };
  const weekday = v => new Date(Date.UTC(v.y, v.m - 1, v.d)).getUTCDay();

  // Lunar info for a date, with the festival names this app treats as important.
  function info(v) {
    const solar = Solar.fromYmd(v.y, v.m, v.d);
    const lunar = solar.getLunar();
    const important = [];
    if (lunar.getMonth() > 0) {
      const name = LUNAR_FESTIVALS[`${lunar.getMonth()}-${lunar.getDay()}`];
      if (name) important.push(name);
    }
    if (lunar.getFestivals().includes("除夕")) important.push("除夕");
    const jieqi = lunar.getJieQi();
    if (jieqi === "清明") important.push("清明节");
    return { solar, lunar, important, jieqi, holiday: SOLAR_HOLIDAYS[`${v.m}-${v.d}`] || "" };
  }

  let today = toYmd(new Date());
  let selected = today;
  let view = { y: today.y, m: today.m };

  function renderDetail() {
    const { solar, lunar, important, jieqi, holiday } = info(selected);

    $("solar-day").textContent = selected.d;
    $("solar-ym").textContent = `${selected.y}年${selected.m}月`;
    $("solar-week").textContent = `星期${WEEK[weekday(selected)]} · ${solar.getXingZuo()}座`;

    const diff = dayNum(selected) - dayNum(today);
    $("today-badge").textContent =
      diff === 0 ? "今天" : diff === 1 ? "明天" : diff === -1 ? "昨天" : diff > 0 ? `${diff}天后` : `${-diff}天前`;
    $("today-btn").hidden = diff === 0;

    $("lunar-md").textContent = `农历${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
    $("ganzhi").textContent =
      `${lunar.getYearInGanZhi()}年 ${lunar.getMonthInGanZhi()}月 ${lunar.getDayInGanZhi()}日 · ${ZODIAC_EMOJI[lunar.getYearShengXiao()]} 属${lunar.getYearShengXiao()}`;

    const tags = [];
    const seen = new Set();
    const add = (text, cls) => {
      const key = text.replace(/^\S+ /, "");
      if (!seen.has(key)) { seen.add(key); tags.push([text, cls]); }
    };
    important.forEach(n => add(withEmoji(n), "festival"));
    if (holiday) add(withEmoji(holiday), "festival");
    if (jieqi && jieqi !== "清明") add(`${termEmoji(jieqi)} ${jieqi}`, "term"); // 清明 already shows as 清明节
    solar.getFestivals().forEach(n => add(n, "other"));
    lunar.getOtherFestivals().forEach(n => add(n, "other"));
    $("tags").replaceChildren(...tags.map(([text, cls]) => {
      const el = document.createElement("span");
      el.className = `tag ${cls}`;
      el.textContent = text;
      return el;
    }));

    $("yi").textContent = lunar.getDayYi().join(" ");
    $("ji").textContent = lunar.getDayJi().join(" ");
  }

  // Next important lunar festival strictly after today.
  let nextDate = null;
  function renderNext() {
    for (let i = 1; i <= 400; i++) {
      const v = addDays(today, i);
      const { lunar, important } = info(v);
      if (important.length) {
        nextDate = v;
        $("next-emoji").textContent = FESTIVAL_EMOJI[important[0]] || "🎉";
        $("next-name").textContent = important.join(" · ");
        $("next-date").textContent =
          `${v.y}年${v.m}月${v.d}日 星期${WEEK[weekday(v)]} · 农历${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
        $("next-days").textContent = i;
        return;
      }
    }
  }

  function cellLabel(v) {
    const { lunar, important, jieqi, holiday } = info(v);
    if (important.length) return [CELL_SHORT[important[0]] || important[0], "festival"];
    if (holiday) return [holiday, "festival"];
    if (jieqi) return [jieqi, "term"];
    if (lunar.getDay() === 1) return [`${lunar.getMonthInChinese()}月`, "month"];
    return [lunar.getDayInChinese(), ""];
  }

  function renderCalendar() {
    $("cal-title").textContent = `${view.y}年${view.m}月`;
    const first = { y: view.y, m: view.m, d: 1 };
    const start = addDays(first, -((weekday(first) + 6) % 7)); // weeks start on Monday
    const cells = [];
    for (let i = 0; i < 42; i++) {
      const v = addDays(start, i);
      if (i === 35 && v.m !== view.m) break; // drop an all-next-month 6th row
      const [label, cls] = cellLabel(v);
      const btn = document.createElement("button");
      btn.className = "cell";
      if (v.m !== view.m) btn.classList.add("outside");
      if ([0, 6].includes(weekday(v))) btn.classList.add("weekend");
      if (same(v, today)) btn.classList.add("today");
      if (same(v, selected)) btn.classList.add("selected");
      btn.innerHTML = `<span class="d">${v.d}</span><span class="l ${cls}">${label}</span>`;
      btn.setAttribute("aria-label", `${v.y}年${v.m}月${v.d}日 ${label}`);
      btn.addEventListener("click", () => select(v));
      cells.push(btn);
    }
    $("grid").replaceChildren(...cells);
  }

  function select(v) {
    selected = v;
    view = { y: v.y, m: v.m };
    $("date-input").value = `${v.y}-${pad(v.m)}-${pad(v.d)}`;
    renderDetail();
    renderCalendar();
  }

  function shiftMonth(n) {
    const m = view.m - 1 + n;
    view = { y: view.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 + 1 };
    renderCalendar();
  }

  $("prev-month").addEventListener("click", () => shiftMonth(-1));
  $("next-month").addEventListener("click", () => shiftMonth(1));
  $("today-btn").addEventListener("click", () => select(today));
  $("next-card").addEventListener("click", () => nextDate && select(nextDate));
  $("date-input").addEventListener("change", e => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e.target.value);
    if (m) select({ y: +m[1], m: +m[2], d: +m[3] });
  });

  // Swipe left/right on the calendar to change month.
  let touchX = null;
  const grid = $("grid");
  grid.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
  grid.addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) shiftMonth(dx < 0 ? 1 : -1);
  });

  // Keep "today" correct when the app stays open (or is resumed) across midnight.
  function refreshToday() {
    const now = toYmd(new Date());
    if (same(now, today)) return;
    const wasToday = same(selected, today);
    today = now;
    renderNext();
    if (wasToday) select(today);
    else { renderDetail(); renderCalendar(); }
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshToday(); });
  setInterval(refreshToday, 60000);

  select(today);
  renderNext();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
});
