/**
 * Content images per page, emitted as <image:image> entries in the sitemap so Google Images can find
 * the guide screenshots. Only real content images: no decorative logo icons, and not the blurred
 * WhatsApp support screenshots on the homepage. Paths are public URLs (under /public).
 * Keep in sync when a page's screenshots change.
 */
export const PAGE_IMAGES: Record<string, string[]> = {
  '/': ['/images/best-iptv-service.png'],
  '/iptv-free-trial': ['/images/free-trial/how-to-get-iptv-free-trial-3-steps.webp'],
  '/devices/firestick-iptv': [
    '/images/firestick/settings-home.jpeg',
    '/images/firestick/my-fire-tv-developer-options.jpeg',
    '/images/firestick/about-device-name.jpeg',
    '/images/firestick/install-unknown-apps-downloader-on.jpeg',
  ],
  '/players/tivimate': [
    '/images/tivimate/tivimate-player-menu-recording-multiview.webp',
    '/images/tivimate/tivimate-add-playlist-options.webp',
    '/images/tivimate/tivimate-playlist-name.webp',
    '/images/tivimate/tivimate-xtream-codes-login.webp',
    '/images/tivimate/tivimate-epg-tv-guide-grid.webp',
    '/images/tivimate/playlist-epg-settings.jpg',
    '/images/tivimate/tivimate-channel-list-programme-schedule.webp',
  ],
  '/players/iptv-smarters': [
    '/images/iptv-smarters/iptv-smarters-login-with-xtream-codes-api.webp',
    '/images/iptv-smarters/iptv-smarters-xtream-codes-login-form.webp',
    '/images/iptv-smarters/iptv-smarters-home-live-tv-movies-series.webp',
    '/images/iptv-smarters/m3u-link-server-url-username-password.webp',
  ],
  // Press kit downloads.
  '/press': [
    '/logo.png',
    '/icon-512.png',
    '/images/firestick/settings-home.jpeg',
    '/images/firestick/install-unknown-apps-downloader-on.jpeg',
    '/images/tivimate/xtream-codes-login.jpeg',
    '/images/tivimate/epg-tv-guide.webp',
  ],
};
