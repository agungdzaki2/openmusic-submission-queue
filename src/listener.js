class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const Playlists = await this._playlistsService.getPlaylists(playlistId);
      const Songs = await this._playlistsService.getSongs(playlistId);
      const detailPlaylists = {
        playlists: {
          ...Playlists,
          songs: Songs,
        },
      };
      console.log(detailPlaylists);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(detailPlaylists));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;