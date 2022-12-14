const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

deletePlaylistById = async (req, res) => {
    await Playlist.deleteOne({ _id: req.params.id }, (err, deleteCount) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, deleteCount: deleteCount })
    }).catch(err => console.log(err))
}

createSong = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        list.songs[list.songs.length] = req.body;
        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    message: 'Song Created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Song Not Created!',
                })
            })
    })
}

removeSongAt = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

    let removed = list.songs.splice(req.params.index, 1); 
    list
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: removed[0],
                message: 'Song Removed!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Song Not Removed!',
            })
        })
    })
}

createSongAt = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        list.songs.splice(req.body.songIndex, 0, req.body.songInfo);
        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    message: 'Song Created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Song Not Created!',
                })
            })
    })
}

editSongAt = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        list.songs.splice(req.body.songIndex, 1, req.body.songInfo);
        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    message: 'Song Edited!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Song Not Edited!',
                })
            })
    })
}

moveSong = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        let removed = list.songs.splice(req.body.startIndex, 1);
        list.songs.splice(req.body.endIndex, 0, removed[0]);
        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    message: 'Song Moved!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Song Not Moved!',
                })
            })
    })
}

updatePlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        list.name = req.body.listInfo.name;
        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    message: 'Song Moved!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Song Not Moved!',
                })
            })
    })
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    deletePlaylistById,
    createSong,
    removeSongAt,
    createSongAt,
    editSongAt,
    moveSong,
    updatePlaylistById
}