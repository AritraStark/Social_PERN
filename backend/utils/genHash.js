import bcrypt from 'bcryptjs'

export const hash = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hashedPass = await bcrypt.hash(password, salt)
    return hashedPass
}

export const checkPass = (enteredPass, presentPass) => {
    return await bcrypt.compare(enteredPass, presentPass)
}