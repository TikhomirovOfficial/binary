const generateCode = () => {
    const code = Math.floor(1001 + Math.random() * (9998 + 1 - 1001))
    if (code > 9999) generateCode()
    return code
}
module.exports = generateCode