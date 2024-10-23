export const isAuthorized = (req, res, next) => {
    const {id} = req.params
    if(id !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({message: "You are not allowed to perform this operation"})
    }
    next()
}