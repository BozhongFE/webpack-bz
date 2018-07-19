
/**
* 时间格式化
* fmt: string 时间格式
* new Date().Format('hh:mm'); // --> 16:01
*/
Date.prototype.Format = function (fmt) {
  const date = this;
  const week = ['日', '一', '二', '三', '四', '五', '六'];
  const month = '一 二 三 四 五 六 七 八 九 十 十一 十二'.split(' ');
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'C': month[date.getMonth()], // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'A': date.getHours() < 12 ? '上午' : '下午', // 上下午
    'W': week[parseInt(date.getDay(), 10)], // 星期
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds(), // 毫秒
  };
  let resultText = fmt;
  if (/(y+)/.test(fmt)) resultText = resultText.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      resultText = resultText.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return resultText;
};
