export const getCategoryItems = () => ([
    {id: "cat", title: "Cat"},
    {id: "dog", title: "Dot"},
    {id: "other", title: "Other"},
])

export const getAreaOfInterestCollection = () => ([
    {id: "1", title: "Chronological Order"},
    {id: "2", title: "3D Render"},
    {id: "3", title: "Others"},
])

const KEYS = {
    customRequets: "customRequets",
    customRequetId: "customRequetId"
}

export function insertCustomRequest(data) {
    let customRequets = getAllCustomRequests()
    data["id"] = generateCustomRequestId()
    customRequets.push(data)
    localStorage.setItem(KEYS.customRequets, JSON.stringify(customRequets))
}

export function generateCustomRequestId() {
    if(localStorage.getItem(KEYS.customRequetId) == null)
        localStorage.setItem(KEYS.customRequetId, "0")
    var id = parseInt(localStorage.getItem(KEYS.customRequetId))
    localStorage.setItem(KEYS.customRequetId, (++id).toString())
    return id
}

export function getAllCustomRequests() {
    if(localStorage.getItem(KEYS.customRequets) == null)
        localStorage.setItem(KEYS.customRequets, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.customRequets))
}