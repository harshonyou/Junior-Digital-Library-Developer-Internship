export const getHomePageSlideShowTransitions = () => ([
    {id: "1", title: "Classic Home Page"},
    {id: "2", title: "Background Video"},
    {id: "3", title: "Center Layout"},
])

export const getCreditPageSlideShowTransitions = () => ([
    {id: "1", title: "Classic Credit Page"},
    {id: "2", title: "Background Video"},
    {id: "3", title: "Center Layout"},
])

export const getOtherPageSlideShowTransitions = () => ([
    {id: "1", title: "Full Sized Image"},
    {id: "2", title: "Image and Text Block"},
    {id: "3", title: "Full Sized Text"},
    {id: "4", title: "HTML Embed amd Text Block"},
    {id: "5", title: "360 View Angle"},
    {id: "6", title: "Zoomed Out Image"},
])

export const getOtherPageOptionsSlideShowTransitions = () => ([
    {id: "1", options: [
        {id: "1", title: "Left"},
        {id: "2", title: "Center"},
        {id: "3", title: "Right"}
    ]},
    {id: "2", options: [
        {id: "1", title: "Left"},
        {id: "2", title: "Center"},
        {id: "3", title: "Right"}
    ]},
    {id: "3", options: [
        {id: "1", title: "Left"},
        {id: "2", title: "Center"},
        {id: "3", title: "Right"}
    ]},
    {id: "4", options: [
        {id: "1", title: "Left"},
        {id: "2", title: "Center"},
        {id: "3", title: "Right"}
    ]},
    {id: "5", options: [
        {id: "1", title: "Left"},
        {id: "2", title: "Center"},
        {id: "3", title: "Right"}
    ]},
    {id: "6", options: [
        {id: "1", title: "Left"},
        {id: "2", title: "Center"},
        {id: "3", title: "Right"}
    ]},
])

export const getAreaOfInterestCollection = () => ([
    {id: "1", title: "Chronological Order"},
    {id: "2", title: "3D Render"},
    {id: "3", title: "Others"},
])

export const getAdvanceAnimationType = () => ([
    {id: "1", title: "Ease Out"},
    {id: "2", title: "Ease In"},
    {id: "3", title: "Ease In-Out"},
    {id: "4", title: "Snap"},
    {id: "5", title: "Wind Up"},
])

const KEYS = {
    slideShowRequets: "slideShowRequets",
    slideShowRequetId: "slideShowRequetId"
}

export function insertSlideShowRequest(data) {
    let slieShowRequets = getAllSlideShowRequests()
    data["id"] = generateSlideShowRequestId()
    slieShowRequets.push(data)
    localStorage.setItem(KEYS.slideShowRequets, JSON.stringify(slieShowRequets))
}

export function generateSlideShowRequestId() {
    if(localStorage.getItem(KEYS.slideShowRequetId) == null)
        localStorage.setItem(KEYS.slideShowRequetId, "0")
    var id = parseInt(localStorage.getItem(KEYS.slideShowRequetId))
    localStorage.setItem(KEYS.slideShowRequetId, (++id).toString())
    return id
}

export function getAllSlideShowRequests() {
    if(localStorage.getItem(KEYS.slideShowRequets) == null)
        localStorage.setItem(KEYS.slideShowRequets, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.slideShowRequets))
}