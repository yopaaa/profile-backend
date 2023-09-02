import express from 'express'
import ResponseApi from '../js/ResponseApi.js'
import { users } from './database.js'
import { nanoid } from 'nanoid'
import axios from 'axios'
import parser from 'ua-parser-js'

const visitor = express.Router()

visitor.get('/:user', async (req, res) => {
  const { user } = req.params
  const { name, des, address, work, email, githubUsername, Link, Certificate, Skills, Experience, Blog } = req.query
  const specificQuery = {
    _id: 0,
    name: name === '1' ? 1 : undefined,
    des: des === '1' ? 1 : undefined,
    address: address === '1' ? 1 : undefined,
    work: work === '1' ? 1 : undefined,
    email: email === '1' ? 1 : undefined,
    githubUsername: githubUsername === '1' ? 1 : undefined,
    Link: Link === '1' ? 1 : undefined,
    Certificate: Certificate === '1' ? 1 : undefined,
    Skills: Skills === '1' ? 1 : undefined,
    Experience: Experience === '1' ? 1 : undefined,
    Blog: Blog === '1' ? 1 : undefined
  }
  Object.keys(specificQuery).forEach((key) => {
    if (specificQuery[key] === undefined) {
      delete specificQuery[key]
    }
  })

  const isValid = user in users

  if (isValid) {
    const pw = users[user].data
    const data = await pw.Db.find({ username: user }, specificQuery)
    ResponseApi(req, res, 200, data)
    return
  }
  ResponseApi(req, res, 400)
})

visitor.put('/:user/data', async (req, res) => {
  const { user } = req.params
  const { name, des, address, work, email, githubUsername } = req.body

  const specificQuery = {
    name: name || undefined,
    des: des || undefined,
    address: address || undefined,
    work: work || undefined,
    email: email || undefined,
    githubUsername: githubUsername || undefined
  }

  Object.keys(specificQuery).forEach((key) => {
    if (specificQuery[key] === undefined) {
      delete specificQuery[key]
    }
  })

  const isValid = user in users
  const specificQueryLength = Object.keys(specificQuery).length
  // console.log(specificQuery)
  // console.log(specificQueryLength)

  if (isValid && specificQueryLength > 0) {
    const pw = users[user].data
    const data = await pw.Db.updateOne({ username: user }, specificQuery)
    ResponseApi(req, res, 200, data)
    return
  }
  ResponseApi(req, res, 400)
})

visitor.get('/:user/count', async (req, res) => {
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

visitor.post('/:user/new', async (req, res) => {
  const { userAgent, ipAddress = '192.168.1.1' } = req.body
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
    const pw = users[user].visitors

    const { ua, browser, engine, os, device, cpu, visitor } = extract
    await pw.insertOne({
      _id: nanoid(),
      ua,
      browser,
      engine,
      os,
      device,
      cpu,
      visitor
    })
    const count = await pw.Db.count()

    ResponseApi(req, res, 200, { lang: lang.split(',')[0], count })
    return
  }
  ResponseApi(req, res, 400)
})

export default visitor
