import Api from "../http/requests"

export const CheckAuth = async () => {
    try {
        const {data} = await Api.refreshToken()
        return data

    } catch (error) {
        console.log(error.message);
        throw new Error('Пользователь не авторизован')
    }
}
