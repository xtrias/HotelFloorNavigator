// Shared data layer for editor and navigator
const STORAGE_KEY = 'hotelFloorData';

const DEFAULT_AREA_TYPES = [
  { id: 'room', label: 'Room', color: '#3498db' },
  { id: 'gym', label: 'Gym', color: '#e74c3c' },
  { id: 'toilet', label: 'Toilet', color: '#9b59b6' },
  { id: 'facilities', label: 'Facilities', color: '#f39c12' },
  { id: 'corridor', label: 'Corridor', color: '#95a5a6' },
  { id: 'elevator', label: 'Elevator', color: '#1abc9c' },
  { id: 'stairs', label: 'Stairs', color: '#34495e' },
  { id: 'lobby', label: 'Lobby', color: '#2ecc71' },
  { id: 'service', label: 'Service', color: '#e67e22' },
  { id: 'other', label: 'Other', color: '#7f8c8d' }
];

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { hotels: [], areaTypes: DEFAULT_AREA_TYPES };
  try {
    const data = JSON.parse(raw);
    if (!data.areaTypes || !data.areaTypes.length) data.areaTypes = DEFAULT_AREA_TYPES;
    if (!data.hotels) data.hotels = [];
    return data;
  } catch {
    return { hotels: [], areaTypes: DEFAULT_AREA_TYPES };
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function ensureSample() {
  const data = loadData();
  if (data.hotels.length === 0) {
    data.hotels.push({
      id: generateId(),
      name: 'Sample Hotel',
      floors: [{
        id: generateId(),
        number: 1,
        planImage: null,
        areas: []
      }]
    });
    saveData(data);
  }
  return data;
}

function getAreaType(data, typeId) {
  return (data.areaTypes || DEFAULT_AREA_TYPES).find(t => t.id === typeId) || DEFAULT_AREA_TYPES[0];
}
