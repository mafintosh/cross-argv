const IS_WINDOWS = process.platform === 'win32'

module.exports = crossArgv

function crossArgv (pargv, force) {
  if (!pargv) pargv = process.argv
  if (!IS_WINDOWS && !force) return pargv

  const argv = []
  var tmp = []

  for (var i = 0; i < pargv.length; i++) {
    const v = pargv[i]

    if (v[v.length - 1] === "'" && tmp.length) {
      tmp.push(v)
      argv.push(tmp.join(' ').slice(1, -1))
      tmp = []
      continue
    }

    if (tmp.length) {
      tmp.push(v)
      continue
    }

    if (v[0] === "'") {
      tmp.push(v)
      continue
    }

    argv.push(v)
  }

  return argv
}
