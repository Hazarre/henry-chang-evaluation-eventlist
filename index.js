// json server has to be in a different folder

const eventsAPIs = (function () {

  const API_URL = "http://localhost:3000/events";

  async function getEvents() {
    return fetch(API_URL).then((res) => res.json());
  }

  async function postEvent(newEvent) {
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    }).then((res) => res.json());
  }

  async function deleteEvent(id) {
    return fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  return {
    getEvents,
    postEvent,
    deleteEvent,
  };
})();

let eventMusic = {
  eventName: "Music Festival",
  startDate: "2023-01-20",
  endDate: "2023-01-21",
  id: "30a1",
};

// eventsAPIs.getEvents().then(
//   (res) => console.log("GET Request successful: ", res)
// );

// eventsAPIs.deleteEvent("30a1").then(
//   (res) => console.log("DELELTE Request successful: ", res)
// );

// eventsAPIs.postEvent(eventMusic).then(
//   (res) => console.log("POST Request successful: ", res)
// );

// class EventsModel {
//   // #events;
//   // constructor(events = []) {
//   //   this.#events = events;
//   // }
//   // getEvents() {
//   //   return this.#events;
//   // }
//   // setEvents(newEvents) {
//   //   this.#events = newEvents;
//   // }
//   // postEvent(newEvent) {
//   //   this.#events.push(newEvent);
//   // }
//   // deleteEvent(id) {
//   //   this.#events = this.#events.filter((event) => event.id !== id);
//   // }
// }

// class EventsView {
//   constructor() {
//     this.newEventForm = document.querySelector(".new-event-form");
//     this.eventInput = document.querySelector("#new-event");
//     this.eventList = document.querySelector(".event-list");
//   }

//   clearInput() {
//     this.eventInput.value = "";
//   }

//   renderEvents(events) {
//     this.eventList.innerHTML = "";
//     events.forEach((event) => {
//       this.renderNewEvent(event);
//     });
//   }

//   removeEventElem(id) {
//     document.getElementById(id).remove();
//   }

//   renderNewEvent(newEvent) {
//     this.eventList.appendChild(this.createEventElement(newEvent));
//   }

//   createEventElement(event) {
//     const eventElement = document.createElement("div");
//     eventElement.classList.add("event");
//     eventElement.setAttribute("id", event.id);
//     eventElement.innerHTML = `<div class="event__title">${event.title}</div>
//     <div class="event__actions">
//       <button class="event__del-btn">Delete</button>
//       <button class="event__edit-btn">Edit</button>
//     </div>`;
//     return eventElement;
//   }
// }

// class EventsController {
//   constructor(view, model) {
//     this.view = view;
//     this.model = model;
//     this.init();
//   }

//   init() {
//     this.setUpEvents();
//     this.fetchEvents();
//   }

//   setUpEvents() {
//     this.setUpSubmitEvent();
//     this.setUpDeleteEvent();
//   }

//   async fetchEvents() {
//     const events = await eventsAPIs.getEvents();
//     // this.model.setEvents(events);
//     this.view.renderEvents(events);
//   }

//   setUpDeleteEvent() {
//     //event delegation
//     this.view.eventList.addEventListener("click", async (e) => {
//       const elem = e.target;
//       if (elem.classList.contains("event__del-btn")) {
//         const eventElem = elem.parentElement.parentElement;
//         const deleteId = eventElem.id;
//         await eventsAPIs.deleteEvent(deleteId);
//         this.model.deleteEvent(deleteId);
//         this.view.removeEventElem(deleteId);
//       }
//     });
//   }

//   setUpSubmitEvent() {
//     this.view.newEventForm.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const input = this.view.eventInput;
//       const title = input.value;
//       if (!title) {
//         return;
//       }

//       const newEvent = await eventsAPIs.postEvent({
//         title,
//       });
//       this.model.postEvent(newEvent);
//       //   console.log(this.model.getEvents());
//       this.view.renderNewEvent(newEvent);
//       this.view.clearInput();
//     });
//   }
// }

// const eventsView = new EventsView();
// const eventsModel = new EventsModel();
// const eventsController = new EventsController(eventsView, eventsModel);
