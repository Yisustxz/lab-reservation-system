require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

app.post('/send', (req, res) => {
  const { to, message } = req.body
  console.log(`Notificación enviada a ${to}: ${message}`)
  res.json({ success: true })
})

app.get('/ping', (req, res) => {
  res.send('Servicio de notificaciones activo')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Notifications service running on port ${PORT}`)
})
