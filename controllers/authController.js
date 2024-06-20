const User = require("../models/User")
const bcrypt = require("bcrypt")
const { use } = require("../routes/authRoute")

const postSigninController = async (req, res) => {
    const login = req.body.login
    const password = req.body.password

    // 1. Wyszukujemy w bazie danych User'a który ma taki login jak przesłany w zmiennej login
    // 2. Sprawdzamy czy wyszukano uzytkownika - czyli czy ostnieje w bazie danych
    // 3. Sprawdzamy czy przesłane hasło jest zdogne z hasłem w bazie danych
    // 4. Jeśli wszystkie etapy logowania przeszły poprawnie, to znaczy, że użytkownik podał poprawne dane i możemy mu odesłać stosony obiekt (patrz na opis)

    const user = await User.findOne( {where: {login: login}} )
    console.log(login)
    console.log(user)
    if(!user)
    {
        res.status(400)
        res.json({
            success: false,
            message: "Nie ma takiego użytkownika"
        })
        return
    }
        
    const passwordResult = await bcrypt.compare(password, user.password)
    if(!passwordResult)
    {
        res.status(400)
        res.json({
            success: false,
            message: "Blędne hasło"
        })
        return
    }

    res.status(200)
    res.json({
        success: true,
        user
    })
}



module.exports = {
    postSigninController
}
