function pad0(u: number) {
  let unit = `${u}`
  return ('0' + unit).length > 2 ? unit : ('0' + unit)
}
export function pad00(u: number) {
  let unit = `${u}`
  return ('00' + unit).length > 3 
    ? (('0' + unit).length > 3 ? unit : ('0' + unit)) 
    : ('00' + unit)
}
export function computeTime(ms: number) {
  var hour = Math.floor(ms / 360000);
  var minute = Math.floor((ms - (hour * 360000)) / 6000);
  var second = Math.floor(
    (ms - ((hour * 360000) + (minute * 6000))) / 100
  );
  var milisecond = ms - (
    (hour * 360000) + (minute * 6000) + (second * 100)
  );

  return(`${pad0(hour)}:${pad0(minute)}:${pad0(second)},${pad0(milisecond)}`)
}