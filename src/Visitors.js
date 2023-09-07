import express from 'express'
import ResponseApi from '../js/ResponseApi.js'
import { users, usersData } from './database.js'
import { nanoid } from 'nanoid'
import axios from 'axios'
import parser from 'ua-parser-js'

const visitor = express.Router()

visitor.get('/:user/data', async (req, res) => {
  const { user } = req.params
  const { name, des, address, work, email, githubUsername } = req.query

  const specificQuery = {
    _id: 0,
    name: name === '1' ? 1 : undefined,
    des: des === '1' ? 1 : undefined,
    address: address === '1' ? 1 : undefined,
    work: work === '1' ? 1 : undefined,
    email: email === '1' ? 1 : undefined,
    githubUsername: githubUsername === '1' ? 1 : undefined
  }
  const exclusionQuery = { Link: 0, Certificate: 0, Skills: 0, Experience: 0, Blog: 0 }

  Object.keys(specificQuery).forEach((key) => {
    if (specificQuery[key] === undefined) {
      delete specificQuery[key]
    }
  })

  console.log(specificQuery)
  const isValid = user in users

  if (isValid) {
    const data = await usersData.Db.findOne({ username: user }).select(specificQuery).select(exclusionQuery)
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

  if (isValid && specificQueryLength > 0) {
    const data = await usersData.Db.updateOne({ username: user }, specificQuery)
    ResponseApi(req, res, 200, data)
    return
  }
  ResponseApi(req, res, 400)
})

visitor.get('/:user/data/Certificate', async (req, res) => {
  const { user } = req.params
  const { _id } = req.query

  const isValid = user in users

  if (isValid) {
    const data = await usersData.Db.findOne({ username: user }, { _id: 0, Certificate: 1 })
    if (_id) {
      const findData = data.Certificate.find((val) => val._id === _id)
      ResponseApi(req, res, 200, findData)
    } else {
      ResponseApi(req, res, 200, data)
    }
    return
  }
  ResponseApi(req, res, 400)
})

visitor.put('/:user/data/Certificate', async (req, res) => {
  const { user } = req.params
  const { name, title, des, img, date, link, _id } = req.body

  const specificQuery = {
    'Certificate.$.name': name || undefined,
    'Certificate.$.title': title || undefined,
    'Certificate.$.des': des || undefined,
    'Certificate.$.img': img || undefined,
    'Certificate.$.date': date || undefined,
    'Certificate.$.link': link || undefined
  }

  Object.keys(specificQuery).forEach((key) => {
    if (specificQuery[key] === undefined) {
      delete specificQuery[key]
    }
  })

  const isValid = user in users
  const specificQueryLength = Object.keys(specificQuery).length

  if (isValid && specificQueryLength > 0) {
    const data = await usersData.Db.updateOne(
      { username: user, 'Certificate._id': _id },
      {
        $set: specificQuery
      }
    )
    ResponseApi(req, res, 200, data)
    return
  }
  ResponseApi(req, res, 400)
})

visitor.get('/:user/data/Blog', async (req, res) => {
  const { user } = req.params
  const { _id } = req.query

  const isValid = user in users

  if (isValid) {
    const data = await usersData.Db.findOne({ username: user }, { _id: 0, Blog: 1 })
    if (_id) {
      const findData = data.Blog.find((val) => val._id === _id)
      ResponseApi(req, res, 200, findData)
    } else {
      ResponseApi(req, res, 200, data)
    }
    return
  }
  ResponseApi(req, res, 400)
})

visitor.put('/:user/data/Blog', async (req, res) => {
  const { user } = req.params
  const { name, title, des, img, date, link, _id } = req.body

  // name,title,des,img,date,link,_id
  const specificQuery = {
    'Blog.$.name': name || undefined,
    'Blog.$.title': title || undefined,
    'Blog.$.des': des || undefined,
    'Blog.$.img': img || undefined,
    'Blog.$.date': date || undefined,
    'Blog.$.link': link || undefined
  }

  Object.keys(specificQuery).forEach((key) => {
    if (specificQuery[key] === undefined) {
      delete specificQuery[key]
    }
  })

  const isValid = user in users
  const specificQueryLength = Object.keys(specificQuery).length

  if (isValid && specificQueryLength > 0) {
    const data = await usersData.Db.updateOne(
      { username: user, 'Blog._id': _id },
      {
        $set: specificQuery
      }
    )
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
