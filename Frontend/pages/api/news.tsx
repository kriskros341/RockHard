const baseURL = 'http://rockhard.ddns.net:3002' 
export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}
