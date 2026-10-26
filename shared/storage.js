// Shared data layer for editor and navigator
const STORAGE_KEY = 'hotelFloorData';

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { hotels: [] };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { hotels: [] };
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

// Sample seed data if empty
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
