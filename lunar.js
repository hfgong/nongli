// 简化版农历库，仅用于演示核心逻辑
// 实际开发建议引入完整版库，例如 lunar-javascript

const lunarData = {
  festivals: {
    "1-1": "春节",
    "5-5": "端午节",
    "8-15": "中秋节"
  },
  jieqi: [
    "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
    "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑",
    "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"
  ]
};

function solarToLunar(date) {
  // ⚠ 注意：这里只是一个占位逻辑
  // 实际项目请用更完整的农历算法库

  const lunarMonth = date.getMonth() + 1;
  const lunarDay = date.getDate();
  const lunarStr = `农历 ${lunarMonth}月${lunarDay}日`;

  const festival = lunarData.festivals[`${lunarMonth}-${lunarDay}`] || '';
  const jieqi = lunarData.jieqi[(date.getMonth() * 2) % 24] || '';

  return { lunarStr, festival, jieqi };
}
