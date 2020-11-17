namespace SpriteKind {
    export const Wave = SpriteKind.create()
    export const Coral = SpriteKind.create()
}
function adjustSceneSpriteSpeed (sceneSprite: Sprite, spriteSpeed: number) {
    sceneIncreaseSpeed = hunter.vx / swimmingSpeedX / 2
    if (sceneIncreaseSpeed == 0) {
        sceneSprite.vx = spriteSpeed
    } else if (sceneIncreaseSpeed < 0) {
        sceneSprite.vx = spriteSpeed - spriteSpeed * sceneIncreaseSpeed
    } else {
        sceneSprite.vx = spriteSpeed - spriteSpeed * sceneIncreaseSpeed
    }
}
function setPlayer () {
    swimmingSpeedX = 30
    swimmingSpeedY = 20
    sceneIncreaseSpeed = 0
    lastTimeNotTakingAir = game.runtime()
    milliSecondsPer10Air = 1500
    hunter = sprites.create(img`
        ........................
        ..............fff.......
        .............f2fffff....
        ...........ff22eeeeeff..
        ..........ff222eeeeeeff.
        ..........feeeefffeeeef.
        .........fe2222eeefffff.
        .........f2efffff222efff
        ..cc.....fffeeefffffffff
        ..cdcc...fee44fbbe44efef
        ..ccddcc..feddfbb4d4eef.
        ....cdddceefddddd4eeef..
        .....ccdcddee2222222f...
        ......cccdd44e544444f...
        .........eeeeffffffff...
        .............ff...fff...
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Player)
    hunter.setFlag(SpriteFlag.StayInScreen, true)
    hunter.setFlag(SpriteFlag.ShowPhysics, true)
    hunter.setPosition(scene.screenWidth() - hunter.width, scene.screenHeight() / 2)
    air = statusbars.create(20, 4, StatusBarKind.Health)
    air.attachToSprite(hunter, 5, 5)
    air.setFlag(SpriteFlag.Invisible, false)
    blockObject.storeOnSprite(blockObject.create(), hunter)
}
function startGame () {
    controller.moveSprite(hunter, swimmingSpeedX, swimmingSpeedY)
    for (let aWave of waves) {
        aWave.vx = waveSpeed
    }
    for (let aCoralReef of coralReefs) {
        aCoralReef.vx = coralSpeed
    }
    hunter.y = waves[0].bottom
    takingAir = true
}
function adjustScene () {
    for (let aWave of sprites.allOfKind(SpriteKind.Wave)) {
        if (aWave.left > scene.screenWidth()) {
            aWave.right = 0
        }
        adjustSceneSpriteSpeed(aWave, waveSpeed)
    }
    for (let aCoralReef of sprites.allOfKind(SpriteKind.Coral)) {
        if (aCoralReef.left > scene.screenWidth()) {
            aCoralReef.right = 0
        }
        adjustSceneSpriteSpeed(aCoralReef, coralSpeed)
    }
    if (hunter.x < scene.screenWidth() / 3) {
        hunter.x = scene.screenWidth() / 3
    }
}
function checkBreathing () {
    if (hunter.y < waves[0].bottom) {
        hunter.y = waves[0].bottom
        takingAir = true
        lastTimeNotTakingAir = game.runtime()
        air.value = 100
    } else if (hunter.top > waves[0].bottom) {
        takingAir = false
    }
    if (!(takingAir)) {
        if (lastTimeNotTakingAir + milliSecondsPer10Air < game.runtime()) {
            air.value += -10
            lastTimeNotTakingAir = game.runtime()
        }
    }
}
function setScene () {
    scene.setBackgroundImage(img`
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999988999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9998999999988899999999999999989999999999999988888899999999999899999999999999999999999999988889999999999998888999999999999999999999999999999999998888899999999999
        9988899998888899999999999998888899999999988888888889999999988888899999999999888899999998888888999999999888888899999999999999988888899999999998888888888999999999
        8888888888888889999999988888888889999988888888888888888888888888888889999888888888888888888888889999988888888888899999999998888888888999999888888888888899999998
        8888888888888888888998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888878888888888888888888888888888888888888888888888888888888888888888888888888888888887888888888888888888888888888888888888888888888888888888888888888888888
        888888887c887888888888888888788888887788888888888888888888788888888888888888878888888888887888888888888888888788888888888878888778888888887878888888888877888888
        8878888cccc78888788888888888777778887888888788888888778888788888888888888888878888cccccc887888888888788888887788877788888778888778888888887877888888878887888887
        8778888cccccc887cccc877888887cccccc78888887788888888c7c88878cccccccc7777788887888cc777778878788888887778888788788878888cc7c88888778888888878c777888c778888788887
        8777888ccccccc77cccc877888887cccccc888888887c888cccc77cc8887cccccccccc778888877ccccccccc77788778888778c77c77887888878ccc7cccc888887cc88c877cccc77ccc7c8888778887
        c88788cccccccccccccc777788cccccccccccccc888c777cccc77ccc88cc777cccc777cc8888887777cccccc8888ccc77c7788cccccc8cc77ccccccccccccc888ccccccc788cccccc77ccc888cc7cc77
        ccc78ccccccccccccc8778887ccccccccccccc88888ccccccc7ccc8888cccccccccccccccc88888ccccccccc8888cccccccc8ccccccccccccccccccccccccc888ccccccccccccccccccccc888ccccccc
        cccc887ccccccccc8877cccc77cccccccccc8888888cccccccccc888888888ccccccccc88888ccccccccccc88888cccccccc88ccccccccc88cccccccccccc8888ccccccccc8ccccccccc88888ccccccc
        cccc887ccccccccc88ccccccc78ccccccc888888888cccccccccccc8888888ccccccc8888888cccccccccccc8888ccccccccc8cccccccccc888cccccccc888888ccccccccc8cccccccc888888ccccccc
        ccc88878ccccc88888cccccc7788ccccc8888888888ccccccccc8888888888cccccc88888888cccccccccccc88888ccccccccccccccccccc8888ccccccc8888888cccccccc8ccccccccc88888ccccccc
        `)
    waveSpeed = 7.5
    waveImages = [img`
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9919999999991199999999999999999999999999999999911999999999999999199999999999999999999999991999999999999999999999999999999999999999999999999999999919999999999999
        9991999999911199999999999919111999999999999111118199999999991111199999999999999119999999911999999999999919991199999999999999999119999999999999991119919999999991
        9918199991188119999999991111181199999991111188888819999999991811199999999999111119999991118881199999999118881119999999999999911199919999999991118888811999999199
        9188899111888819999999911118888819999911118888888811999999111888811919999991188819999918888888119999911188888811199999999991118888111999999111888888888199199999
        8888881188888811999991188888888811991988888888888881188881188888888881999881888811188818888888881999118888888888111999999911888888888119999888888888888811999198
        8888888888888888888911888888888881188888888888888888888888888888888888888888888888188888888888888888188888888888818199999818888888888888888888888888888881188888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        `, img`
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999911199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999991999999999999999999111999999999999999999999999999999999999999999119999999999999999991999999999999911999999999999999999199999999999999
        9911991999919999199999999991119999999999999911111999999999999919999999999999999199999999991199999999999999111111999999999999991199999999999999991199119999999999
        9991999991911119999999999191181111991999991118881199999911999111999999999999111199999999911889999999999991188911999999999999991911999999999999991888891199999999
        1181199991888811999999991118888811999991111888888811999991111188111999999911888811111191118888911999991111188891111999999999111881199999999111118888881111999911
        8888111888888881199991111888888811199918888888888888888888111888881119999118888888888118888888881111981888888888891199999111888888111111999188888888888811199918
        8888888888888888118118888888888888888888888888888888888888888888888888888888888888888818888888888118888888888888888111999188888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        `]
    waves = []
    for (let index = 0; index <= waveImages.length - 1; index++) {
        aWave = sprites.create(waveImages[index], SpriteKind.Wave)
        aWave.setFlag(SpriteFlag.Ghost, true)
        aWave.top = 17
        aWave.left = 0 - scene.screenWidth() * index
        waves.push(aWave)
    }
    coralSpeed = 3
    coralImages = [img`
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888877788888888888888888888888888888888888888888888888888888888888888888888888878888888888888888888888888888888888888888888888888888888888888888888888888888888
        7788887788888778887788888888888887778888788888887778888877778888788888888888888878888888888888888888888888888888888888888888888888888888888888888888888888878888
        8788887888888788888788888888788888878888777888888877888888778888877777888888888778888888777888888888888888788888888888888888887888888888888888878888888888877888
        8788887888887888888778887888778888778888887888888887777888878888888887778888887788887777788888877888888877888888888877788888877888888888888888887888888888888778
        8788887788887788888778877888778887788888887777888888877888877778888887788888878888887778888888878888888878888888888778888888887777777788888888887888888888888788
        7788887788888788888788877788788877888888888887788887778888887778887778888888877788888877878888877788888878888888888778888888888888888877888888777888888888888788
        78888877c8878788888788887887788877877888888887788877888887877888877888888888788777887777878888888788888878887888888887788788887788888888778787788888888778887888
        77888877cc777787888788877887777787878888887778888877788887878888878888888888788877cc7cc8878888877887888878877888777887787788887788877777778777888888788878878878
        778888cccc77887cccc877878887cccccc78888887778888877c7c888787cccccc777777888878887c777778878787778887778878788788878877cc7c88888778878888878c777888c7788887878878
        777888ccccccc77cccc877878887cccccc888888887c888cc7c77cc8887ccccccc7cc778888877cc7cccccc77788778888778c77c77887888878ccc7cccc888887cc88c877cccc77ccc7c88887778878
        cc788cccccccccccccc777788cccccccccccccc888c777cccc77ccc88cc777cccc777cc8888887777cccccc8888ccc77c7788cccccc8cc77ccccccccccccc888ccccccc788cccccc77ccc888cc7cc778
        cc78ccccccccccccc8778887ccccccccccccc88888ccccccc7ccc8888cccccccccccccccc88888ccccccccc8888cccccccc8ccccccccccccccccccccccccc888ccccccccccccccccccccc888cccccccc
        ccc887ccccccccc8877cccc77ccccc7cccc8888888cccccccccc888888888ccccccccc88888ccccccccccc88888cccccccc88ccccccccc88cccccc777ccc8888ccc77cccc8ccc7ccccc88888cccccccc
        ccc887ccccccccc88ccccccc78ccccccc888888888ccccc7cccccc8888888cc7cccc8888888cc7ccccccccc8888cccccc7cc8cc7ccccccc888c7cccccc888888cccccc7777cccccccc888888cccc77cc
        cc88878ccccc88888cccccc7788c77cc8888888888cccc7cccc8888888888cccccc88888888cccccc7ccccc8888877ccccccccc7ccccc7c8888ccccccc8888888cccccccc8ccccccccc88888cccccccc
        `, img`
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        7788888877888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888887788
        8878888887888878888888888887888888888888878888888888888888888888888888888888888888888888888888888888888888878888888888888888888888888888888888888888888888877888
        8887788888788878888888888887777788887888878888888878888888888788888778888888888877888888888888887788788888877778888888888888888888888778888888878888888888788888
        8888878877788877888888777788878778887788877888888877788888888877887778888888887778888788888888877788878888888877888888888888888888888878888888887888888888777888
        8888778778888887778888788788888878888788888788888888778888888787888878888888888788887788878888887888878887888887777778888888888888888778888888888788888888887888
        8887788778878888878888888787888887877788888877888888778887888777788878888888788778887888878888878888887777887888888877888788887788887888878788887888888778887888
        878788cccc788777778888887787777777777788887888778887788887888788888777888888788877cc7cc8878888878887888778877888777887887788887788887888878778877888788878887878
        777888ccccc7787cccc8777788877ccccc78888887777777888c7c88878cc7ccccc7777788887888c7777778878788878887778777787788878887cc7c88888778777888878c777788c7788887878878
        777888ccccccc77cccc877888887cccccc888888887c888cccc77cc8887cccccccccc778888877cc77ccccc77788778788778c77c77787888878ccc7cccc8888877788c877cccc777cc7c88887778878
        88788cccccccccccccc777788cccccccccccccc888c777cccc77ccc88cc777cccc777777888887777cccccc8888ccc77c7788cccccc8cc77ccccccccccccc888c77cccc788cccccc77ccc888cc7cc778
        cc78ccccccccccccc8778887ccccccccc77cc88888ccccccc7ccc8888cccccccccc7ccc7c888887cccccccc8888cccccccc8ccccccccccccccccccccccc777777cccccccccccccccccccc888cccccccc
        ccc887ccccccccc8877cccc77cccccccccc7778888ccccccccc7778888888ccccccccc87778ccccccccccc88888cccccccc88ccccccccc88ccccc77ccccc8888ccccccccc8ccccccccc88888cccccccc
        ccc887ccccccccc88ccccccc78ccccccc888778888ccccccccccc77888888ccccccc8888888ccccc7777ccc8888ccccccccc8777ccccccc888cc77cccc888888ccccccccc8cccccccc888888cccccccc
        cc88878ccccc88888cccccc7788ccccc8888888888ccccccccc8888888888cccccc88888888cccccccc7ccc88888ccccc7777cccccccccc8888ccccccc8888888cccccccc8ccccccccc88888cccccccc
        `]
    coralReefs = []
    for (let index = 0; index <= coralImages.length - 1; index++) {
        aCoralReef = sprites.create(coralImages[index], SpriteKind.Coral)
        aCoralReef.setFlag(SpriteFlag.Ghost, true)
        aCoralReef.bottom = scene.screenHeight()
        aCoralReef.left = 0 - scene.screenWidth() * index
        coralReefs.push(aCoralReef)
    }
}
let aCoralReef: Sprite = null
let coralImages: Image[] = []
let aWave: Sprite = null
let waveImages: Image[] = []
let takingAir = false
let coralSpeed = 0
let coralReefs: Sprite[] = []
let waveSpeed = 0
let waves: Sprite[] = []
let air: StatusBarSprite = null
let milliSecondsPer10Air = 0
let lastTimeNotTakingAir = 0
let swimmingSpeedY = 0
let swimmingSpeedX = 0
let hunter: Sprite = null
let sceneIncreaseSpeed = 0
setScene()
setPlayer()
startGame()
game.onUpdate(function () {
    adjustScene()
    checkBreathing()
})
