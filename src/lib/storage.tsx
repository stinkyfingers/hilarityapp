
export const setObject = async (key: string, value: object) => {
    try {
        const valueStr = JSON.stringify(value)
        await localStorage.setItem(`@${key}`, valueStr)
    } catch (err) {
        return err
    }
};

export const getObject = async (key: string) => {
    try {
        const valueStr = await localStorage.getItem(`@${key}`)
        return valueStr !== null ? JSON.parse(valueStr) : null;
    } catch (err) {
        return err
    }
};
