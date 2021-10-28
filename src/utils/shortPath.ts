const shortPath = (path: string): string => {
  return path
    .split('/')
    .map(f => f.substr(0, 2))
    .join('/')
    + '/'
}

export { shortPath }