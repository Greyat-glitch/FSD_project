// Key used for storing our events array in localStorage
const STORAGE_KEY = 'community_hub_events';

 //Helper function to retrieve events from LocalStorage.
 // Returns an array of event objects.from local storage
function getStoredEvents() {
  const eventsData = localStorage.getItem(STORAGE_KEY);
  return eventsData ? JSON.parse(eventsData) : getInitialDefaultEvents();
}

 //Helper function to save an array of events to LocalStorage.
function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

//This are some examples of events for aestetic value, we dodnt want an empty website.
function getInitialDefaultEvents() {
  const defaults = [
    {
      id: '1',
      title: 'Neighborhood Park Cleanup',
      category: 'Volunteer',
      date: '2026-08-15',
      location: 'Central Park Main Entrance',
      description: 'Join us for a morning of cleaning up trash and planting new flowers in the community park.'
    },
    {
      id: '2',
      title: 'Community Soccer Match',
      category: 'Sports',
      date: '2026-08-20',
      location: 'Town Recreation Field',
      description: 'Friendly weekend soccer match open to all age groups and skill levels. Equipment provided.'
    }
  ];
  saveEvents(defaults);
  return defaults;
}

   // Page-Specific Logic Execution
document.addEventListener('DOMContentLoaded', () => {
  // Check which page the user is currently visiting
  const path = window.location.pathname;

  if (document.getElementById('event-form')) {
    initAddEventPage();
  } else if (document.getElementById('events-container')) {
    initBrowseEventsPage();
  } else if (document.getElementById('stats-container')) {
    initHomePage();
  }
});

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

 // Add Event Form Page Logic (add-event.html)
 //Next step is to add add a page logic to the event form in add-events.html, we will handle the form submission and save the new event to localStorage.
function initAddEventPage() {
  const form = document.getElementById('event-form');
  const feedback = document.getElementById('form-feedback');

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

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error-msg');
  errorElements.forEach(el => el.textContent = '');
  document.getElementById('form-feedback').textContent = '';
}


   // Browse Events Page Logic (events.html)
 function initBrowseEventsPage() {
  const container = document.getElementById('events-container');
  const filterSelect = document.getElementById('category-filter');

  // Render initial list
  renderEvents();

  // Category Filter Listener
  filterSelect.addEventListener('change', () => {
    const selectedCategory = filterSelect.value;
    renderEvents(selectedCategory);
  });

  // Render function with filtering & dynamic HTML creation
  function renderEvents(filter = 'all') {
    const events = getStoredEvents();
    container.innerHTML = '';

    const filteredEvents = filter === 'all' 
      ? events 
      : events.filter(e => e.category === filter);

    if (filteredEvents.length === 0) {
      container.innerHTML = '<p>No events found for this category.</p>';
      return;
    }

    filteredEvents.forEach(evt => {
      const card = document.createElement('div');
      card.className = 'event-card';

      card.innerHTML = `
        <span class="category-tag">${evt.category}</span>
        <h3>${evt.title}</h3>
        <div class="event-details">
          <p><strong>Date:</strong> ${evt.date}</p>
          <p><strong>Location:</strong> ${evt.location}</p>
        </div>
        <p>${evt.description}</p>
        <button class="delete-btn" data-id="${evt.id}">Delete</button>
      `;

      container.appendChild(card);
    });

    // Event listener for Delete buttons
    const deleteButtons = container.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idToDelete = e.target.getAttribute('data-id');
        deleteEvent(idToDelete);
      });
    });
  }

  function deleteEvent(id) {
    let events = getStoredEvents();
    events = events.filter(e => e.id !== id);
    saveEvents(events);
    renderEvents(filterSelect.value); // Re-render updated list
  }
}

