export const isEmptyString = value => {
    const regex = new RegExp(/\S/g)
    return !regex.test(value)
}

export const getToken = () => localStorage.getItem("token")