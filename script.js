/*
  =====================================================
  JAVASCRIPT — THE INTERACTIVE LAYER
  =====================================================

  HTML = structure (what's on the page)
  CSS  = appearance (what it looks like)
  JS   = behavior (what it does when you interact)

  This file does ONE job:
  Watch which section is visible and highlight the matching nav link.

  Without this, clicking a nav link scrolls you to the right section —
  but the nav doesn't show which section you're currently in.
  This script adds that visual feedback.
*/


/*
  =====================================================
  STEP 1: GRAB THE ELEMENTS WE NEED
  =====================================================

  document.querySelectorAll(selector)
  → works like a CSS selector, but in JavaScript
  → returns a list of ALL matching elements

  This is the main way to "reach into" the HTML from JavaScript.
*/

// Get all <section> elements (our scrollable content blocks)
const sections = document.querySelectorAll('section');

// Get all <a> links inside the <nav>
const navLinks = document.querySelectorAll('nav a');


/*
  =====================================================
  STEP 2: SET UP THE INTERSECTION OBSERVER
  =====================================================

  IntersectionObserver watches elements and tells us
  when they enter or leave the visible part of the screen (viewport).

  Think of the viewport as a "window" — IntersectionObserver
  fires a callback whenever an element is visible through that window.

  Why not use scroll events instead?
  scroll events fire hundreds of times per second while scrolling
  and can slow down the page. IntersectionObserver is more efficient —
  the browser handles it natively.
*/

const observer = new IntersectionObserver(
  /*
    This is the CALLBACK function — it runs whenever a watched
    element's visibility changes.

    It receives an array of "entries", one per watched element.
    Each entry has:
      entry.target        → the element being observed
      entry.isIntersecting → true if it's currently visible
  */
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        /*
          A section entered the viewport.
          We want to highlight its matching nav link.
        */

        // Get the id of the visible section (e.g. "about", "skills")
        const visibleId = entry.target.id;

        // Remove the "active" class from ALL nav links first
        navLinks.forEach(function(link) {
          link.classList.remove('active');
        });

        /*
          classList lets you add/remove/toggle CSS classes via JavaScript.
          That's the bridge between JS and CSS:
            JS adds the class → CSS sees .active → styles apply

          Find the nav link whose href matches this section's id.
          If the section id is "about", we look for href="#about"
        */
        const matchingLink = document.querySelector('nav a[href="#' + visibleId + '"]');
        if (matchingLink) {
          matchingLink.classList.add('active');
        }
      }
    });
  },

  /*
    OPTIONS OBJECT — configure how the observer works.

    threshold: how much of the element must be visible to trigger.
    0.4 = 40% of the section must be visible.
    Try changing this to 0.1 (triggers sooner) or 0.8 (triggers later).
  */
  {
    threshold: 0.4
  }
);


/*
  =====================================================
  STEP 3: TELL THE OBSERVER WHAT TO WATCH
  =====================================================

  We loop over every section and register it with the observer.
  forEach is a method that runs a function for each item in a list.
*/
sections.forEach(function(section) {
  observer.observe(section);
});


/*
  =====================================================
  THAT'S ALL THE JAVASCRIPT WE NEED.
  =====================================================

  Summary of what happens:
  1. Page loads → script runs → observer starts watching all sections
  2. User scrolls → a section becomes 40%+ visible
  3. Observer fires callback with that section as entry.target
  4. We read entry.target.id → find the matching nav link
  5. We remove .active from all links → add .active to the matching one
  6. CSS sees nav a.active → applies the blue color + underline

  To experiment: open DevTools (F12 in browser), go to Elements tab,
  scroll the page, and watch the "active" class move between nav links.
*/