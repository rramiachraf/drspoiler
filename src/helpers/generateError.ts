export default (error: string): string => {
  // duplicate
  if (error.includes('duplicate key value')) {
    const [, duplicated] = error.split('_')
    return `${duplicated} is taken`
  }

  // missing
  if (error.includes('null value in column')) {
    const [, missing] = error.split('"')
    return `${missing} is missing`
  }

  // others
  return error
}
