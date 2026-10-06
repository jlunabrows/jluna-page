# Model casting reel (3D motion)

Source for the 25s 1080×1920 model-casting reel. `reel.html?lang=en|ko` renders any frame via `window.renderAt(t)`.

Render (needs Playwright + ffmpeg):

    python3 -m http.server 8765   # from this folder
    node render.js en             # frames-en/f0000.png …
    ffmpeg -framerate 30 -i frames-en/f%04d.png -c:v libx264 -crf 21 -pix_fmt yuv420p -tune grain -movflags +faststart JLUNA_Model_Casting_en.mp4

Photos (`img/woman_web.jpg`, `img/man_web.jpg`, `img/woman_ba_web.jpg`, `img/man_ba_web.jpg`, `img/brow_gold.png`, `img/brow_pts.json`) are kept out of this public repo; place them in `reel/img/` before rendering.
