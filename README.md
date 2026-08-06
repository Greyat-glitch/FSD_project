# Community Event & Task Hub

A lightweight, responsive web application designed to help local community members browse, track, and create shared neighborhood events and volunteer tasks without complex management software.

## Problem Solved
Small local organizations and community groups often lack simple tools to publish local activities, cleanups, and sports meetings. This application provides an easy-to-use platform that allows users to seamlessly post events and store them locally on their devices, making event tracking simple and immediate.

## Features
- **Semantic Multi-Page Layout:** HTML structure utilizing `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` across 3 distinct pages.
- **Dynamic LocalStorage Data Persistence:** Form data captured on the "Add Event" page is persisted into `localStorage` and dynamically displayed across the home dashboard and events directory.
- **Interactive Filtering & Management:** Filter events dynamically by category or delete outdated events from the system in real time.
- **Form Input Validation:** Interactive client-side JavaScript validation preventing empty submissions with specific field error messaging.
- **Responsive CSS Layout:** Custom Flexbox and CSS Grid architecture with media queries adaptable for mobile, tablet, and desktop screens.

## Technical Stack
- **HTML5:** Semantic markup and custom form controls.
- **CSS3:** Flexbox, CSS Grid, CSS Variables, and Mobile-First Media Queries.
- **JavaScript (ES6):** DOM Manipulation, Event Listeners, and Web Storage API (`localStorage`).

## Page Breakdown
1. `index.html` (Home Dashboard): Summary statistics showing total registered community events and active categories.
2. `events.html` (Browse Events): Dynamic card grid displaying all events with filter options and deletion capabilities.
3. `add-event.html` (Add Event): Validated form allowing community members to publish new events.

## Installation & Local Setup
1. Clone the repository to your local machine:
   ```bash
   git clone [https://github.com/YOUR_GITHUB_USERNAME/community-event-hub.git](https://github.com/YOUR_GITHUB_USERNAME/community-event-hub.git)
