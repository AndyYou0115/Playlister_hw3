/*
    This is our http api, which we use to send requests to
    our back-end API. Note we're using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it's a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE'LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /playlist). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const getAllPlaylists = () => api.get(`/playlists`)
export const getPlaylistPairs = () => api.get('playlistpairs')
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const createPlaylist = (newList) => api.post(`/playlist`, newList)
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}/delete`)
export const createSong = (listId, newSong) => api.post(`/playlist/${listId}`, newSong)
export const removeSongAt = (listId, index) => api.delete(`/playlist/${listId}/${index}/deleteSong`)
export const createSongAt = (listId, index, info) => api.post(`/playlist/${listId}/createSongAt`, {songIndex: index, songInfo: info})

const apis = {
    getAllPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    createPlaylist,
    deletePlaylistById,
    createSong,
    removeSongAt,
    createSongAt
}

export default apis
