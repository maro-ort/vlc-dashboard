const toTime = (seconds: number | string): string => {
  return new Date(seconds as number * 1000).toISOString().substr(11, 8)
}


export {
  toTime
}