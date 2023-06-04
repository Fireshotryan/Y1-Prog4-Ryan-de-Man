import { ImageSource, Sound, Resource, Loader } from 'https://esm.sh/excalibur'



const Resources = {
    Background: new ImageSource("images/background.png"),
    Backgroundtwo: new ImageSource("images/backgroundtwo.png"),
    Gameover: new ImageSource("images/gameover.png"),
    Startscreen: new ImageSource("images/startscherm.png"),
    Coin: new ImageSource("images/coin.png"),
    Barrel: new ImageSource("images/barrel.png"),
    Ground: new ImageSource("images/ground.png"),
    Player: new ImageSource("images/adventurer.png"),
    Platform: new ImageSource("images/platform.png"),
    SplashSound: new Sound("assets/splash.mp3"),
    CoinSound: new Sound("assets/coin.mp3"),
    PlatformData: new Resource("data/platforms.json", "json"),
    PlatformDataTwo: new Resource("data/platformtwo.json", "json")
}

const ResourceLoader = new Loader([
    Resources.Background,
    Resources.Backgroundtwo,
    Resources.Gameover,
    Resources.Startscreen,
    Resources.Coin,
    Resources.Barrel,
    Resources.Ground,
    Resources.Player,
    Resources.Platform,
    Resources.SplashSound,
    Resources.CoinSound,
    Resources.PlatformData,
    Resources.PlatformDataTwo
])

export { Resources, ResourceLoader }
