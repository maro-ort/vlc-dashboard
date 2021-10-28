const toTime = (seconds: number | string): string => {
  const time = new Date(seconds as number * 1000)
    .toISOString()
    .substr(11, 8)

  return time
    .split(':')
    .reduce((acc: string[], x: string) => {
      if (acc.length === 0 && x === '00') return []
      return [ ...acc, x]
    }, [])
    .join(':')
}


export {
  toTime
}