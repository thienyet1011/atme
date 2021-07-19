import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export async function connect() {  
  return open({
    filename: './atme.sqlite',
    driver: sqlite3.Database
  })
}