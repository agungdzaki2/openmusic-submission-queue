const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const query = {
      text: `SELECT playlists.id, playlists.name 
            FROM playlists
            WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getSongs(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
            FROM playlistsongs
            JOIN songs ON playlistsongs.song_id = songs.id
            WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;