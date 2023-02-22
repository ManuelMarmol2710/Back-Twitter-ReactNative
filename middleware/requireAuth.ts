import{Request,Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export const requireAuth =(req:Request, res:Response, next: NextFunction) =>{

const authHeader = req.headers.authorization

if(!authHeader) return res.status(401).json({msg: 'No autorizado'})


const token = authHeader.split(' ')[1]
if(!token) {

    return res.status(401).json({msg: 'No autorizado'})
}


jwt.verify(token, "secret",(err , payload)=> {

if(err) return res.status(401).json(
{
    msg: 'No autorizado'
}

)
req.payload = payload

next();


})

}
