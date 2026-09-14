Team headshots.

Drop one file per member here, then point content/team.json at it:
  { "name": "Jessica Pauli", "role": "...", "photo": "/assets/team/jessica-pauli.webp" }

Square source, face centred, 320x320 or larger. The card crops to an 80px
circle and next/image serves a retina-sized copy from whatever you drop in.

Members with no photo fall back to avatar-placeholder.png automatically, so
there is no need to add a placeholder entry by hand. Edit the .svg and run
`npm run build:avatar` if that placeholder ever needs changing.
