import express from 'express'
import ResponseApi from '../js/ResponseApi.js'
import { users, anonymousMsgData } from './database.js'
import { nanoid } from 'nanoid'
import axios from 'axios'
import parser from 'ua-parser-js'

const NGL = express.Router()

NGL.get('/:user/count', async (req, res) => {
  const { user } = req.params
  const isValid = user in users

  if (isValid) {
    const pw = users[user].visitors
    const data = await pw.Db.count()
    ResponseApi(req, res, 200, { count: data })
    return
  }
  ResponseApi(req, res, 400)
})

NGL.post('/:user/new', async (req, res) => {
  const { userAgent, ipAddress = '192.168.1.1', msg } = req.body
  const { user } = req.params
  const isValid = user in users && userAgent

  if (isValid) {
    const extract = parser(userAgent)

    try {
      const extractIp = await axios.get(`https://ipapi.co/${ipAddress}/json/`)
      extract.visitor = extractIp.data
    } catch (error) {
      console.log(error.message)
      extract.visitor = ipAddress
    }

    const lang = extract.visitor && extract.visitor.languages ? extract.visitor.languages : 'en'

    const { ua, browser, engine, os, device, cpu, visitor } = extract
    const insertData = await anonymousMsgData.insertOne({
      _id: nanoid(),
      msg: String(msg),
      user,
      ua,
      browser,
      engine,
      os,
      device,
      cpu,
      visitor
    })

    ResponseApi(req, res, 200, { lang: lang.split(',')[0], data: insertData })
    return
  }
  ResponseApi(req, res, 400)
})

export default NGL
