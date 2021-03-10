import jwt from 'jsonwebtoken'

const genToken = (id) => {
    let token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' })
    return token
}

export default genToken