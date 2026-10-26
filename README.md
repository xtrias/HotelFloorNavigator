# HotelFloorNavigator

First draft of a hotel floor plan management system.

See **[DECISIONS.md](DECISIONS.md)** for the full record of requirements, architecture decisions, and feature history.

## Structure

- **editor/** — Floor plan editor: upload image, draw polygons, assign types and labels, move/reshape areas.
- **navigator/** — Operational view: browse floors, see status overlays (icon/text), update status.
- **config/** — Configuration: manage area types, colors, and status overlay settings (text / icon / both).

Data is stored in browser localStorage (key: `hotelFloorData`) so all views share the same dataset when run from the same origin.

## How to run

```bash
npx serve .
# or
python -m http.server 8000
```

Then visit:
- `/` for the landing page
- `/editor/` for the editor
- `/navigator/` for the navigator
- `/config/` for configuration

Sample floor JSON files are in `samples/`.

## Data model (prototype)

See `DECISIONS.md` for the full schema. Polygons use normalized 0–1 coordinates relative to the floor plan image.

Next steps: backend, auth, better drawing tools, multi-user, etc.
