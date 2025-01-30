

export const pagination = (page: any, pageRecord: any) => {
    try {
        const _page = parseInt(page);
        const limit = parseInt(pageRecord);
        const offset = (page * limit) - limit
        return { limit, offset }
    } catch (err: any) {
        throw err
    }
}