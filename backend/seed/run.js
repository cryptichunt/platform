const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config({ path: `${__dirname}/../../.env` })
}

const fs = require('fs')

async function main() {
  const script = process.argv[2]
  if (!script) {
    console.error('Invalid script')
    return
  }

  if (script === 'all') {
    const scripts = fs.readdirSync(__dirname).filter((f) => f !== 'run.js')

    for (let script of scripts) {
      const fn = require(`./${script}`)

      console.log(`${Date.now()} Running ${__dirname}/${script}`)
      await fn()
      console.log(`${Date.now()} Ran ${__dirname}/${script}`)
    }

    return
  }

  if (fs.readdirSync(__dirname).indexOf(`${script}.js`) === -1) {
    console.error('Invalid script')
    return
  }

  const fn = require(`./${script}.js`)

  console.log(`${Date.now()} Running ${__dirname}/${script}.js`)
  await fn()
  console.log(`${Date.now()} Ran ${__dirname}/${script}.js`)

  return
}

main()
  .then(() => {
    process.exit()
  })
  .catch(console.error)
