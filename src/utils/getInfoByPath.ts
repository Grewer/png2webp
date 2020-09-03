const getInfoByPath = (path: string): {
  name: string,
  suffix: string,
  directory: string,
} => {
  const point = path.lastIndexOf('.')
  const separate = path.lastIndexOf('/')
  return {
    name: path.slice(separate + 1, point),
    suffix: path.slice(point + 1),
    directory: path.slice(0, separate + 1),
  }
}
//目录

export default getInfoByPath
