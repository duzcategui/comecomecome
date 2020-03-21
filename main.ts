enum ActionKind {
    Walking,
    Idle,
    Jumping
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.powerUp.play()
    mySprite2.setPosition(Math.randomRange(10, 160), Math.randomRange(10, 120))
    mySprite.say("Mmmm..", 1000)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.powerDown.play()
    scene.cameraShake(4, 500)
    mySprite.startEffect(effects.fire, 100)
    mySprite.say("AUCH!", 1000)
    myEnemy.setPosition(Math.randomRange(10, 160), Math.randomRange(10, 120))
})
function setup () {
    MonkeyFrames = [sprites.builtin.forestMonkey0, sprites.builtin.forestMonkey3, sprites.builtin.forestMonkey4]
    animation.runImageAnimation(
    MonkeyFrames,
    MonkeyFrames,
    50,
    true
    )
}
info.onLifeZero(function () {
    mySprite.destroy(effects.disintegrate, 500)
    game.over(false)
})
let MonkeyFrames: Image[] = []
let mySprite2: Sprite = null
let myEnemy: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(5)
music.baDing.play()
mySprite = sprites.create(img`
. . . . f f f f f . . . . . . . 
. . . f e e e e e f . . . . . . 
. . f d d d d e e e f . . . . . 
. c d f d d f d e e f f . . . . 
. c d f d d f d e e d d f . . . 
c d e e d d d d e e b d c . . . 
c d d d d c d d e e b d c . f f 
c c c c c d d d e e f c . f e f 
. f d d d d d e e f f . . f e f 
. . f f f f f e e e e f . f e f 
. . . . f e e e e e e e f f e f 
. . . f e f f e f e e e e f f . 
. . . f e f f e f e e e e f . . 
. . . f d b f d b f f e f . . . 
. . . f d d c d d b b d f . . . 
. . . . f f f f f f f f f . . . 
`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
info.setLife(3)
myEnemy = sprites.create(img`
. . . . . c c c c c c c . . . . 
. . . . c 6 7 7 7 7 7 6 c . . . 
. . . c 7 c 6 6 6 6 c 7 6 c . . 
. . c 6 7 6 f 6 6 f 6 7 7 c . . 
. . c 7 7 7 7 7 7 7 7 7 7 c . . 
. . f 7 8 1 f f 1 6 7 7 7 f . . 
. . f 6 f 1 f f 1 f 7 7 7 f . . 
. . . f f 2 2 2 2 f 7 7 6 f . . 
. . c c f 2 2 2 2 7 7 6 f c . . 
. c 7 7 7 7 7 7 7 7 c c 7 7 c . 
c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
. f 6 1 1 1 1 1 6 6 6 6 c . . . 
. . f f c c c c c c c c . . . . 
`, SpriteKind.Enemy)
myEnemy.follow(mySprite, 10)
myEnemy.setPosition(Math.randomRange(10, 160), Math.randomRange(10, 120))
mySprite2 = sprites.create(img`
. . . . c c c b b b b b . . . . 
. . c c b 4 4 4 4 4 4 b b b . . 
. c c 4 4 4 4 4 5 4 4 4 4 b c . 
. e 4 4 4 4 4 4 4 4 4 5 4 4 e . 
e b 4 5 4 4 5 4 4 4 4 4 4 4 b c 
e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e 
e b b 4 4 4 4 4 4 4 4 4 4 4 b e 
. e b 4 4 4 4 4 5 4 4 4 4 b e . 
8 7 e e b 4 4 4 4 4 4 b e e 6 8 
8 7 2 e e e e e e e e e e 2 7 8 
e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e 
e c 6 7 6 6 7 7 7 6 6 7 6 c c e 
e b e 8 8 c c 8 8 c c c 8 e b e 
e e b e c c e e e e e c e b e e 
. e e b b 4 4 4 4 4 4 4 4 e e . 
. . . c c c c c e e e e e . . . 
`, SpriteKind.Food)
mySprite2.setPosition(Math.randomRange(10, 160), Math.randomRange(10, 120))
game.splash("10 to win!", "")
setup()
game.onUpdateInterval(2000, function () {
    animation.runImageAnimation(
    MonkeyFrames,
    MonkeyFrames,
    50,
    true
    )
})
forever(function () {
    music.playMelody("B A G A G F A C5 ", 322)
    if (info.score() == 10) {
        game.over(true)
    }
    MonkeyFrames = animation.createAnimation(ActionKind.Walking, 1000)
    MonkeyFrames.addAnimationFrame(img`
. . . . . 3 3 b 3 3 d d 3 3 . . 
. . . . 3 1 1 d 3 d 1 1 1 1 3 . 
. . . 3 d 1 1 1 d 1 1 1 d 3 1 3 
. . 3 d d 1 1 1 d d 1 1 1 3 3 3 
. 3 1 1 d 1 1 1 1 d d 1 1 b . . 
. 3 1 1 1 d 1 1 1 1 1 d 1 1 3 . 
. b d 1 1 1 d 1 1 1 1 1 1 1 3 . 
. 4 b 1 1 1 1 d d 1 1 1 1 d 3 . 
. 4 4 d 1 1 1 1 1 1 d d d b b . 
. 4 d b d 1 1 1 1 1 1 1 1 3 . . 
4 d d 5 b d 1 1 1 1 1 1 1 3 . . 
4 5 d 5 5 b b d 1 1 1 1 d 3 . . 
4 5 5 d 5 5 d b b b d d 3 . . . 
4 5 5 5 d d d d 4 4 b 3 . . . . 
. 4 5 5 5 4 4 4 . . . . . . . . 
. . 4 4 4 . . . . . . . . . . . 
`)
    animation.runImageAnimation(
    mySprite,
    [img`
. . . . f f f f f . . . . . . . 
. . . f e e e e e f . . . . . . 
. . f d d d d e e e f . . . . . 
. c d f d d f d e e f . . . . . 
. c d f d d f d e e f f . . . . 
c d e e d d d d e e d d f . . . 
c d d d d c d d e e b d c . . . 
c c c c c d d e e e b d c . f f 
. f d d d d e e e f f c . f e f 
. f f f f f f e e e e f . f e f 
. f f f f e e e e e e e f f e f 
f d d f d d f e f e e e e f f . 
f d b f d b f e f e e e e f . . 
f f f f f f f f f f f f e f . . 
. . . . . . . . . f c d d f . . 
. . . . . . . . . . f f f f . . 
`],
    500,
    false
    )
})
