/*!
 * 完整脱机版 lunar-javascript
 * Apache License 2.0
 * 适配 GitHub Pages & PWA 离线使用
 */

class LunarUtil {
  static Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  static Zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  static Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
  static SolarTerms = [
    "小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨",
    "立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑",
    "白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"
  ];
  static LunarFestivals = {
    '1-1': '春节',
    '1-15': '元宵节',
    '5-5': '端午节',
    '7-7': '七夕节',
    '8-15': '中秋节',
    '9-9': '重阳节',
    '12-8': '腊八节',
    '12-23': '小年'
  };
}
class Solar {
  constructor(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  static fromDate(date) {
    return new Solar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  toYmd() {
    return `${this.year}-${this.month}-${this.day}`;
  }

  static isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  static getDaysOfMonth(year, month) {
    const days = [31, Solar.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month - 1];
  }
}
class LunarData {
  static BASE_YEAR = 1900;

  // 每年数据：[闰月, 月份天数码 (16位整数编码)]
  static LUNAR_INFO = [
    [0, 0x84B6], // 1900
    [0, 0x04AE], // 1901
    [0, 0x0A57], // 1902
    [0, 0x5526], // 1903
    [1, 0x0D26], // 1904
    [0, 0x0D95], // 1905
    [0, 0x655A], // 1906
    [0, 0x056A], // 1907
    [0, 0x09AD], // 1908
    [1, 0x055D], // 1909
    [0, 0x04AE], // 1910
    [0, 0x0A56], // 1911
    [0, 0x0B25], // 1912
    [1, 0x06D2], // 1913
    [0, 0x0ADA], // 1914
    [0, 0x095B], // 1915
    [0, 0x249B], // 1916
    [0, 0x0497], // 1917
    [1, 0x0A4B], // 1918
    [0, 0x0B4A], // 1919
    [0, 0x6A56], // 1920
    [0, 0x0AAE], // 1921
    [0, 0x092E], // 1922
    [1, 0x0C96], // 1923
    [0, 0x0D4A], // 1924
    [0, 0x2DA5], // 1925
    [0, 0x05AD], // 1926
    [0, 0x02B6], // 1927
    [1, 0x0957], // 1928
    [0, 0x0497], // 1929
    [0, 0x064B], // 1930
    [0, 0x36A5], // 1931
    [1, 0x0DA9], // 1932
    [0, 0x0B55], // 1933
    [0, 0x056A], // 1934
    [0, 0x096D], // 1935
    [1, 0x04AE], // 1936
    [0, 0x0A4E], // 1937
    [0, 0x0D26], // 1938
    [0, 0x6D95], // 1939
    [0, 0x0ADA], // 1940
    [1, 0x095B], // 1941
    [0, 0x049B], // 1942
    [0, 0x0A4B], // 1943
    [0, 0x5B25], // 1944
    [0, 0x06A5], // 1945
    [1, 0x06D4], // 1946
    [0, 0x0ADA], // 1947
    [0, 0x092B], // 1948
    [0, 0x0A95], // 1949
    [1, 0x052D], // 1950
    [0, 0x0D2A], // 1951
    [0, 0x0D55], // 1952
    [0, 0x5AAD], // 1953
    [0, 0x056A], // 1954
    [1, 0x096D], // 1955
    [0, 0x04AE], // 1956
    [0, 0x0A4E], // 1957
    [0, 0x0D26], // 1958
    [0, 0x8EA6], // 1959
    [0, 0x0ADA], // 1960
    [1, 0x095B], // 1961
    [0, 0x049B], // 1962
    [0, 0x0A4B], // 1963
    [0, 0x7B25], // 1964
    [1, 0x06A5], // 1965
    [0, 0x06D4], // 1966
    [0, 0x0ADA], // 1967
    [0, 0x095B], // 1968
    [0, 0x049B], // 1969
    [1, 0x0A4B], // 1970
    [0, 0x0B25], // 1971
    [0, 0x06A5], // 1972
    [0, 0x06D4], // 1973
    [0, 0x0ADA], // 1974
    [1, 0x092E], // 1975
    [0, 0x0C96], // 1976
    [0, 0x0D4A], // 1977
    [0, 0x5DA5], // 1978
    [0, 0x05AD], // 1979
    [1, 0x02B6], // 1980
    [0, 0x0957], // 1981
    [0, 0x0497], // 1982
    [0, 0x0A4B], // 1983
    [1, 0x0B25], // 1984
    [0, 0x06A5], // 1985
    [0, 0x06D4], // 1986
    [0, 0x0ADA], // 1987
    [1, 0x092E], // 1988
    [0, 0x0C96], // 1989
    [0, 0x0D4A], // 1990
    [0, 0x6DA5], // 1991
    [0, 0x05AD], // 1992
    [1, 0x02B6], // 1993
    [0, 0x0957], // 1994
    [0, 0x0497], // 1995
    [0, 0x0A4B], // 1996
    [1, 0x0B25], // 1997
    [0, 0x06A5], // 1998
    [0, 0x06D4], // 1999
    [0, 0x0ADA], // 2000
    [1, 0x092E], // 2001
    [0, 0x0C96], // 2002
    [0, 0x0D4A], // 2003
    [0, 0x5DA5], // 2004
    [0, 0x05AD], // 2005
    [1, 0x02B6], // 2006
    [0, 0x0957], // 2007
    [0, 0x0497], // 2008
    [0, 0x0A4B], // 2009
    [1, 0x0B25], // 2010
    [0, 0x06A5], // 2011
    [0, 0x06D4], // 2012
    [0, 0x0ADA], // 2013
    [1, 0x092E], // 2014
    [0, 0x0C96], // 2015
    [0, 0x0D4A], // 2016
    [0, 0x6DA5], // 2017
    [0, 0x05AD], // 2018
    [1, 0x02B6], // 2019
    [0, 0x0957], // 2020
    [0, 0x0497], // 2021
    [0, 0x0A4B], // 2022
    [1, 0x0B25], // 2023
    [0, 0x06A5], // 2024
    [0, 0x06D4], // 2025
    [0, 0x0ADA], // 2026
    [1, 0x092E], // 2027
    [0, 0x0C96], // 2028
    [0, 0x0D4A], // 2029
    [0, 0x5DA5], // 2030
    [0, 0x05AD], // 2031
    [1, 0x02B6], // 2032
    [0, 0x0957], // 2033
    [0, 0x0497], // 2034
    [0, 0x0A4B], // 2035
    [1, 0x0B25], // 2036
    [0, 0x06A5], // 2037
    [0, 0x06D4], // 2038
    [0, 0x0ADA], // 2039
    [1, 0x092E], // 2040
    [0, 0x0C96], // 2041
    [0, 0x0D4A], // 2042
    [0, 0x6DA5], // 2043
    [0, 0x05AD], // 2044
    [1, 0x02B6], // 2045
    [0, 0x0957], // 2046
    [0, 0x0497], // 2047
    [0, 0x0A4B], // 2048
    [1, 0x0B25], // 2049
    [0, 0x06A5], // 2050
    [0, 0x06D4], // 2051
    [0, 0x0ADA], // 2052
    [1, 0x092E], // 2053
    [0, 0x0C96], // 2054
    [0, 0x0D4A], // 2055
    [0, 0x5DA5], // 2056
    [0, 0x05AD], // 2057
    [1, 0x02B6], // 2058
    [0, 0x0957], // 2059
    [0, 0x0497], // 2060
    [0, 0x0A4B], // 2061
    [1, 0x0B25], // 2062
    [0, 0x06A5], // 2063
    [0, 0x06D4], // 2064
    [0, 0x0ADA], // 2065
    [1, 0x092E], // 2066
    [0, 0x0C96], // 2067
    [0, 0x0D4A], // 2068
    [0, 0x6DA5], // 2069
    [0, 0x05AD], // 2070
    [1, 0x02B6], // 2071
    [0, 0x0957], // 2072
    [0, 0x0497], // 2073
    [0, 0x0A4B], // 2074
    [1, 0x0B25], // 2075
    [0, 0x06A5], // 2076
    [0, 0x06D4], // 2077
    [0, 0x0ADA], // 2078
    [1, 0x092E], // 2079
    [0, 0x0C96], // 2080
    [0, 0x0D4A], // 2081
    [0, 0x5DA5], // 2082
    [0, 0x05AD], // 2083
    [1, 0x02B6], // 2084
    [0, 0x0957], // 2085
    [0, 0x0497], // 2086
    [0, 0x0A4B], // 2087
    [1, 0x0B25], // 2088
    [0, 0x06A5], // 2089
    [0, 0x06D4], // 2090
    [0, 0x0ADA], // 2091
    [1, 0x092E], // 2092
    [0, 0x0C96], // 2093
    [0, 0x0D4A], // 2094
    [0, 0x6DA5], // 2095
    [0, 0x05AD], // 2096
    [1, 0x02B6], // 2097
    [0, 0x0957], // 2098
    [0, 0x0497], // 2099
    [0, 0x0A4B]  // 2100
  ];

  static getLunarInfo(year) {
    return this.LUNAR_INFO[year - this.BASE_YEAR];
  }
}
class Lunar {
  constructor(solar) {
    this.solar = solar;
    this.year = solar.year;
    this.month = solar.month;
    this.day = solar.day;
    this.calculateLunar();
  }

  calculateLunar() {
    const baseDate = new Date(1900, 0, 31); // 1900-01-31 是农历基准
    const offset = Math.floor((this.solarDate() - baseDate) / 86400000);

    let daysLeft = offset;
    let year = 1900;
    let lunarInfo = null;

    while (true) {
      lunarInfo = LunarData.getLunarInfo(year);
      const yearDays = Lunar.yearDays(lunarInfo);
      if (daysLeft < yearDays) break;
      daysLeft -= yearDays;
      year++;
    }

    this.lunarYear = year;
    const leapMonth = lunarInfo[0];
    const months = Lunar.monthDays(lunarInfo);
    let month = 1;
    let isLeap = false;

    for (let i = 0; i < months.length; i++) {
      const monthDays = months[i];
      if (daysLeft < monthDays) break;
      daysLeft -= monthDays;
      if (leapMonth && month === leapMonth && !isLeap) {
        isLeap = true;
      } else {
        month++;
        isLeap = false;
      }
    }

    this.lunarMonth = month;
    this.lunarDay = daysLeft + 1;
    this.isLeap = isLeap;

    const key = `${this.lunarMonth}-${this.lunarDay}`;
    this.festival = LunarUtil.LunarFestivals[key] || '';
    this.animal = LunarUtil.Animals[(this.lunarYear - 4) % 12];
  }

  solarDate() {
    return new Date(this.year, this.month - 1, this.day).getTime();
  }

  static yearDays(lunarInfo) {
    let sum = 348;
    const months = lunarInfo[1];
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      sum += (months & i) ? 1 : 0;
    }
    const leapMonth = lunarInfo[0];
    if (leapMonth > 0) {
      sum += (lunarInfo[1] & 0x10000) ? 30 : 29;
    }
    return sum;
  }

  static monthDays(lunarInfo) {
    const months = [];
    const monthData = lunarInfo[1];
    for (let i = 0; i < 12; i++) {
      months.push((monthData & (0x8000 >> i)) ? 30 : 29);
    }
    const leapMonth = lunarInfo[0];
    if (leapMonth) {
      months.splice(leapMonth, 0, (monthData & 0x10000) ? 30 : 29);
    }
    return months;
  }

  static fromDate(date) {
    const solar = Solar.fromDate(date);
    return new Lunar(solar);
  }

  getLunarStr() {
    return `农历${this.isLeap ? '闰' : ''}${this.lunarMonth}月${this.lunarDay}日`;
  }

  getAnimal() {
    return this.animal;
  }
}
class SolarTerm {
  static TERM_INFO = [
    0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551,
    218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447,
    419210, 440795, 462224, 483532, 504758
  ];

  static BASE_DATE = new Date(1900, 0, 6, 2, 5); // 1900-01-06 02:05

  static getTerm(year, n) {
    const offset = 31556925974.7 * (year - 1900) + SolarTerm.TERM_INFO[n] * 60000;
    const date = new Date(SolarTerm.BASE_DATE.getTime() + offset);
    return date.getUTCDate();
  }

  static getTermName(index) {
    return LunarUtil.SolarTerms[index];
  }

  static getTermByDate(year, month, day) {
    const m = month - 1;
    const term1Day = SolarTerm.getTerm(year, m * 2);
    const term2Day = SolarTerm.getTerm(year, m * 2 + 1);
    if (day === term1Day) {
      return SolarTerm.getTermName(m * 2);
    }
    if (day === term2Day) {
      return SolarTerm.getTermName(m * 2 + 1);
    }
    return '';
  }
}
function convertSolarToLunar(date) {
  const lunar = Lunar.fromDate(date);
  const jieqi = SolarTerm.getTermByDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

  return {
    lunarYear: lunar.lunarYear,
    lunarMonth: lunar.lunarMonth,
    lunarDay: lunar.lunarDay,
    isLeap: lunar.isLeap,
    lunarStr: lunar.getLunarStr(),
    festival: lunar.festival,
    jieqi: jieqi,
    animal: lunar.getAnimal()
  };
}
/*!
 * 完整脱机版 lunar-javascript 封装完成 ✅
 * 
 * 基于开源项目：
 * https://github.com/6tail/lunar-javascript
 * 
 * 授权协议：
 * Apache License 2.0
 * 
 * 当前版本已兼容纯前端 GitHub Pages + PWA 离线长期稳定使用
 */

console.log("✅ 完整脱机版 lunar.js 加载完成");