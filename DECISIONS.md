# HotelFloorNavigator — Decisions & Feature History

This document captures the key decisions, requirements, and implementation choices made during the development of the hotel floor plan management prototype.

## Project Goal

Build an application to manage hotel floor plans. The system should:

- Manage hotels and floors.
- Allow creation and viewing of floor plans.
- Identify areas on the floor plan, especially rooms (with room numbers).
- Manage room status and characteristics.
- Be split into two main experiences:
  - **Editor**: create/edit floor plans and define areas.
  - **Navigator / Operations**: browse floor plans, view and update room status.

## Core Technical Decisions

### Floor Plan Representation
- **Image + SVG overlay** approach.
- Users upload a floor plan image (PNG/JPG).
- Areas are drawn as polygons over the image.
- Polygon coordinates are stored as **normalized values (0–1)** relative to the image dimensions so they scale correctly with zoom and different image sizes.

### Data Storage (Prototype)
- All data is stored in **browser localStorage** under the key `hotelFloorData`.
- Shared between the Editor, Navigator, and Configuration views when served from the same origin.
- No backend in the current prototype.

### Application Structure
Three main views:

1. **Editor** (`/editor/`) — Draw and edit areas, manage hotels/floors.
2. **Navigator** (`/navigator/`) — Operational view with status overlays.
3. **Configuration** (`/config/`) — Manage area types, colors, and status display settings.

### Area Types
- Configurable list of area types (room, gym, toilet, facilities, corridor, elevator, stairs, lobby, service, other, etc.).
- Each type has an `id`, `label`, and `color`.
- Types can be added, edited, reordered, and deleted in the Configuration view.

### Room / Area Data Model
```json
{
  "id": "string",
  "type": "room",
  "label": "101",
  "roomNumber": "101",
  "points": [[x, y], [x, y], ...],
  "status": "available",
  "characteristics": {}
}
```

- `points` are normalized (0–1).
- Status is independent of type.

### Status Overlays
- Status display is configurable per status.
- Each status can show:
  - Text only
  - Icon only
  - Both
- Simple conceptual SVG icons are provided for:
  - Available (checkmark)
  - Occupied (person)
  - Cleaning (broom-like)
  - Maintenance (wrench)
  - Closed (lock)
- Icons and text are rendered as overlays on the floor plan in the Navigator.

## Interaction Decisions

### Drawing Polygons (Editor)
- Click "Start drawing".
- Click points on the image.
- A live polyline and points are shown while drawing.
- Click "Finish polygon" to open a form with:
  - Type dropdown (from configured area types)
  - Label / Room number field
- Minimum 3 points required.

### Editing Areas
- Click an area to select it.
- **Drag inside** the selected polygon to move the entire area.
- Drag the white vertex handles to reshape the polygon.
- Edit type, label, and status in the sidebar.
- Delete from the sidebar.

### Zoom
- Zoom buttons (+ / − / 100%).
- Ctrl/Cmd + mouse wheel also zooms.
- Works in both Editor and Navigator.

### Import / Export
- **Export**: downloads the current floor as JSON (areas + metadata; image base64 is omitted for size).
- **Import**: loads a JSON file and replaces the current floor’s areas.
- Supported formats include a `floor.areas` array or a root `areas` array.

## Data Structure (Full)

```json
{
  "areaTypes": [
    { "id": "room", "label": "Room", "color": "#3498db" }
  ],
  "statusConfigs": [
    {
      "id": "available",
      "label": "Available",
      "mode": "icon",
      "icon": "available",
      "text": "Available"
    }
  ],
  "hotels": [
    {
      "id": "...",
      "name": "Sample Hotel",
      "floors": [
        {
          "id": "...",
          "number": 1,
          "planImage": "data:image/... or null",
          "areas": [ /* area objects */ ]
        }
      ]
    }
  ]
}
```

## Implementation Notes

- Pure static HTML/JS + SVG. No build step required.
- Shared logic lives in `shared/storage.js`.
- Sample floor JSON files are in `samples/` (including a calibrated version based on real markings).
- The prototype prioritizes fast iteration over production concerns (auth, multi-user, persistence backend, etc.).

## Open / Future Considerations

- Backend + database for multi-user and persistence.
- Better polygon tools (snap, undo, rectangle mode, copy).
- Linking rooms to external systems (PMS).
- Mobile-friendly editor.
- More sophisticated status icons or custom icon uploads.
- Versioning of floor plans.

## How to Run

```bash
git clone https://github.com/xtrias/HotelFloorNavigator.git
cd HotelFloorNavigator
npx serve .
# or
python -m http.server 8000
```

Then open the root page and navigate to Editor, Navigator, or Configuration.
