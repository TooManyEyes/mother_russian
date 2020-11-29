const{Router} = require('express')
const  router = Router()

router.get('/',(req, res)=>{
    res.sendFile('main_page/index.html', { root: '.' })
})
router.get('/start_game',(req,res)=>{
    res.sendFile('views/game_map/game.html', { root: '.' })
})

module.exports = router