// Key used for storing our events array in localStorage
const STORAGE_KEY = 'community_hub_events';

//helper function to get events from localStorage.
//returns an array of events objects
function getStoredEvents() {
  const eventsData = localStorage.getItem(STORAGE_KEY);
  return eventsData ? JSON.parse(eventsData) : getInitialDefaultEvents();
}

// Helper function to save an array of events to LocalStorage.
function saveEvents(events) { //to local storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}
