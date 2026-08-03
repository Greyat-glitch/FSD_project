// Key used for storing our events array in localStorage
const STORAGE_KEY = 'community_hub_events';

//helper function to get events from localStorage.
//returns an array of events objects
function getStoredEvents() { //from local storage
  const eventsData = localStorage.getItem(STORAGE_KEY);
  return eventsData ? JSON.parse(eventsData) : getInitialDefaultEvents();
}

// Helper function to save an array of events to LocalStorage.
function saveEvents(events) { //to local storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

//This are some examples of events for aestetic value, we dodnt want an empty website.
function getInitialDefaultEvents() {
  const defaults = [
    {
      id: '1',
      title: 'Neighborhood Cleanup',
      category: 'Volunteer',
      date: '2026-08-15',
      location: 'Obama Estate, Njiru, Kanairo',
      description: 'Join us for a morning of cleaning up trash and planting new flowers in the community Estate.'
    },
    {
      id: '2',
      title: 'Community Soccer Match with prizes LOL',
      category: 'Sports',
      date: '2026-08-20',
      location: 'Konambaya Pitch, Njiru, Cairobi',
      description: 'Friendly weekend soccer match open to all age groups and skill levels. Equipment provided. Prizes to be won!LOL'
    }
  ];
  saveEvents(defaults);
  return defaults;
}

// home page loging for index.html
function initHomePage() {
  const statsContainer = document.getElementById('stats-container');
  const events = getStoredEvents();

  // Calculate statistics
  const totalEvents = events.length;
  const categories = [...new Set(events.map(e => e.category))].length;

  statsContainer.innerHTML = `
    <div class="stat-card">
      <span>${totalEvents}</span>
      <p>Total Events</p>
    </div>
    <div class="stat-card">
      <span>${categories}</span>
      <p>Active Categories</p>
    </div>
  `;
}

//Next step is to add add a page logic to the event form in add-events.html, we will handle the form submission and save the new event to localStorage.
function initAddEventPage() {
  const form = document.getElementById('event-form');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload

// Reset previous error messages
    clearErrors();

// Grab field values
    const title = document.getElementById('event-title').value.trim();
    const category = document.getElementById('event-category').value;
    const date = document.getElementById('event-date').value;
    const location = document.getElementById('event-location').value.trim();
    const description = document.getElementById('event-desc').value.trim();

    // Form Validation
    let isValid = true;
    if (!title) {
      showError('title-error', 'Please enter an event title.');
      isValid = false;
    }
    if (!category) {
      showError('category-error', 'Please select a category.');
      isValid = false;
    }
    if (!date) {
      showError('date-error', 'Please pick a date.');
      isValid = false;
    }
    if (!location) {
      showError('location-error', 'Please enter a location.');
      isValid = false;
    }
    if (!description) {
      showError('desc-error', 'Please provide a description.');
      isValid = false;
    }

    if (!isValid) return;

    // Create new event object
    const newEvent = {
      id: Date.now().toString(),
      title,
      category,
      date,
      location,
      description
    };

    // Save to LocalStorage
    const events = getStoredEvents();
    events.push(newEvent);
    saveEvents(events);

    // Provide success feedback and reset form
    feedback.style.color = '#27ae60';
    feedback.textContent = 'Event successfully created! You can now view it in Browse Events.';
    form.reset();

    // Clear feedback message after 4 seconds
    setTimeout(() => {
      feedback.textContent = '';
    }, 4000);
  });
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error-msg');
  errorElements.forEach(el => el.textContent = '');
  document.getElementById('form-feedback').textContent = '';
}

//Browse events page logic from the evnts html
function initBrowseEventsPage() {
  const container = document.getElementById('events-container');
  const filterSelect = document.getElementById('category-filter');

  // Render initial list
  renderEvents();

 