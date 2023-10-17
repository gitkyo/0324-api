import jsonwebtoken from 'jsonwebtoken'
import {User} from '../models/user.js'

export const auth = async (req, res, next) => {
    try {
        //on récupére le token dans le header de la requete
        const token = req.header('Authorization').replace('Bearer ', '')
        //on décode le token
        const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY)
        //on cherche l'utilisateur avec l'id et le token
        const user = await User.findOne({ 
            where: {
                id: decoded.id,
                token: token
            }
        })

        if (!user) {
            throw new Error()
        }
        //on ajoute la propriété user à la requete
        req.user = user
        //on ajoute la propriété token à la requete
        req.token = token
        //on passe à la suite
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}