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

// Simple conceptual SVG icons (inline, 24x24 viewBox)
const STATUS_ICONS = {
  available: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2ecc71"/><path d="M7 12l3 3 7-7" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  occupied: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#e74c3c"/><path d="M6 20c0-4 2.5-6 6-6s6 2 6 6" fill="#e74c3c"/></svg>',
  cleaning: '<svg viewBox="0 0 24 24"><path d="M4 20h16M8 20V8l8-4v16" stroke="#f39c12" stroke-width="2" fill="none"/><circle cx="16" cy="6" r="2" fill="#f1c40f"/></svg>',
  maintenance: '<svg viewBox="0 0 24 24"><path d="M14 6l4 4-8 8H6v-4l8-8z" fill="#9b59b6"/><path d="M16 4l4 4" stroke="#8e44ad" stroke-width="2"/></svg>',
  closed: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="1" fill="#7f8c8d"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#7f8c8d" stroke-width="2" fill="none"/></svg>'
};

const DEFAULT_STATUS_CONFIGS = [
  { id: 'available', label: 'Available', mode: 'icon', icon: 'available', text: 'Available' },
  { id: 'occupied', label: 'Occupied', mode: 'icon', icon: 'occupied', text: 'Occupied' },
  { id: 'cleaning', label: 'Cleaning', mode: 'both', icon: 'cleaning', text: 'Cleaning' },
  { id: 'maintenance', label: 'Maintenance', mode: 'icon', icon: 'maintenance', text: 'Maint.' },
  { id: 'closed', label: 'Closed', mode: 'text', icon: 'closed', text: 'Closed' }
];

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { hotels: [], areaTypes: DEFAULT_AREA_TYPES, statusConfigs: DEFAULT_STATUS_CONFIGS };
  try {
    const data = JSON.parse(raw);
    if (!data.areaTypes || !data.areaTypes.length) data.areaTypes = DEFAULT_AREA_TYPES;
    if (!data.statusConfigs || !data.statusConfigs.length) data.statusConfigs = DEFAULT_STATUS_CONFIGS;
    if (!data.hotels) data.hotels = [];
    return data;
  } catch {
    return { hotels: [], areaTypes: DEFAULT_AREA_TYPES, statusConfigs: DEFAULT_STATUS_CONFIGS };
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

function getStatusConfig(data, statusId) {
  return (data.statusConfigs || DEFAULT_STATUS_CONFIGS).find(s => s.id === statusId) || DEFAULT_STATUS_CONFIGS[0];
}

function getStatusIconSvg(iconKey) {
  return STATUS_ICONS[iconKey] || STATUS_ICONS.available;
}
