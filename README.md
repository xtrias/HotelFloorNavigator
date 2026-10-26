# HotelFloorNavigator

First draft of a hotel floor plan management system.

## Structure

- **editor/** — Floor plan editor: upload image, draw room polygons, assign room numbers and basic info.
- **navigator/** — Operational view: browse hotels/floors, see rooms colored by status, update status and characteristics.

Data is stored in browser localStorage (key: `hotelFloorData`) so both apps share the same dataset when run from the same origin.

## How to run

Open the HTML files directly in a browser, or serve the repo with any static server:

```bash
npx serve .
```

Then visit:
- `/editor/` for the editor
- `/navigator/` for the navigator

## Data model (prototype)

```json
{
  "hotels": [
    {
      "id": "...",
      "name": "Sample Hotel",
      "floors": [
        {
          "id": "...",
          "number": 1,
          "planImage": "data:image/... or url",
          "areas": [
            {
              "id": "...",
              "type": "room",
              "roomNumber": "101",
              "points": [[x,y], [x,y], ...],
              "status": "available",
              "characteristics": {
                "beds": "Queen",
                "capacity": 2,
                "notes": ""
              }
            }
          ]
        }
      ]
    }
  ]
}
```

Next steps: backend, auth, better drawing tools, multi-user, etc.
