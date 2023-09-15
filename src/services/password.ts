import * as crypto from 'crypto'

export {
  hashPassword,
  verifyPassword
}

async function hashPassword (password: string) {

  return new Promise((resolve, reject) => {

    const salt = crypto.randomBytes(16).toString('hex')

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {

      if (err) reject(err)

      resolve(salt + ':' + derivedKey.toString('hex'))

    })
  })
}

async function verifyPassword (password: string, hash: string) {

  return new Promise((resolve, reject) => {

    const [salt, key] = hash.split(':')

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {

      if (err) reject(err)

      resolve(key == derivedKey.toString('hex'))

    })
  })
}
