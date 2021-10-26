const env = (name: string, fallback?: string): string => {
  return process.env[`REACT_APP_${name}`] || fallback || ''
}

export { env }