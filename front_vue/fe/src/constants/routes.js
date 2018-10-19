const httpPrefix = '/api'

export default {
    DEPARTMENTS: `${httpPrefix}/departs`,
    RECIPES_BY_DEPARTMENT: (id) => `${httpPrefix}/departs/${id}/recipes`
}
