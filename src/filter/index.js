
// 歌词解析
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
export function parseLyric (lrc) {
  const lines = lrc.split('\n')
  const lyric = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const result = timeExp.exec(line)
    if (!result) {
      continue
    }
    const text = line.replace(timeExp, '').trim()
    if (text) {
      lyric.push({
        time: (result[1] * 6e4 + result[2] * 1e3 + (result[3] || 0) * 1) / 1e3,
        text
      })
    }
  }
  return lyric
}
// 数字过滤
export function changeNumber (val) {
  if (!val) {
    return
  }
  var newVal = val.toString()
  if (val > 9999) {
    newVal = newVal
      .split('')
      .reverse()
      .slice(4)
      .reverse()
      .join('')
    newVal = newVal + '万'
  }
  return newVal
}
// 时间过滤
export function time (val) {
  var secondType = typeof val
  if (secondType === 'number' || secondType === 'string') {
    val = parseInt(val)
    var mimute = Math.floor(val / 60)
    val = val - mimute * 60
    return ('0' + mimute).slice(-2) + ':' + ('0' + val).slice(-2)
  } else {
    return '00:00'
  }
}
