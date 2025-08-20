import { PrismaClient } from '@prisma/client'
import { app } from 'electron'
import path from 'path'

function resolveDbUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    // Put SQLite file inside Electron's userData folder
    const userDataPath = app.getPath('userData')
    return `file:${path.join(userDataPath, 'todos.db')}`
  } else {
    // In development, use an absolute path relative to the project root
    // The main process is located in the .webpack folder, so we need to go up a few levels.
    return `file:${path.join(app.getAppPath(), 'prisma', 'todos.db')}`
  }
}

const prisma = new PrismaClient({
  datasources: {
    db: { url: resolveDbUrl() }
  }
})

export default prisma
