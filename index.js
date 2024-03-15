
import { EditIcon, DeleteIcon, SaveIcon, CancelIcon, AddIcon } from "./icons.js"


const eventsAPIs = (function () {
  const API_URL = "http://localhost:3000/events";

  async function getEvent(id) {
    return fetch(`${API_URL}/${id}`).then((res) => res.json());
  }

  async function getEvents() {
    return fetch(API_URL).then((res) => res.json());
  }

  async function putEvent(id, newEvent) {
    return fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    }).then((res) => res.json());
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
    getEvent,
    putEvent,
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

class EventsModel {
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
  // postEvent(newEvent) {
  //   this.#events.push(newEvent);
  // }
  //   // deleteEvent(id) {
  //   //   this.#events = this.#events.filter((event) => event.id !== id);
  //   // }
}

function editEventHandler(id) {
  console.log(id);
}
class EventsView {
  constructor() {
    this.newEventForm = document.querySelector("#new-events-form");
    this.newEventFormDisplay = document.querySelector(
      "#add-events-form__tfoot"
    );
    this.addEventButton = document.querySelector("#toggle-add-event__button");
    this.cancelAddEventButton = document.querySelector(
      "#cancel-add-event__button"
    );
    this.eventNameInput = document.querySelector("#eventName__input");
    this.startDateInput = document.querySelector("#startDate__input");
    this.endDateInput = document.querySelector("#endDate__input");
    this.eventList = document.querySelector("#events__tbody");
    this.init_view();
  }

  init_view() {
    document.querySelector("#add-event__button").innerHTML = SaveIcon; 
    document.querySelector("#cancel-add-event__button").innerHTML = CancelIcon; 

    this.newEventFormDisplay.style.visibility = "collapse";
    this.cancelAddEventButton.addEventListener("click", () => {
      this.newEventFormDisplay.style.visibility = "collapse";
    });
    this.addEventButton.addEventListener("click", () => {
      this.newEventFormDisplay.style.visibility = "initial";
    });
  }

  clearInput() {
    this.eventNameInput.value = "";
    this.startDateInput.value = "";
    this.endDateInput.value = "";
  }

  renderEvents(events) {
    this.eventList.innerHTML = "";
    events.forEach((event) => {
      this.renderNewEvent(event);
    });
  }

  removeEventElem(id) {
    document.getElementById(id).remove();
  }

  renderNewEvent(newEvent) {
    this.eventList.appendChild(this.createEventElement(newEvent));
    this.eventList.appendChild(this.createEditEventElement(newEvent));
  }

  createEditEventElement(event) {
    const eventElement = document.createElement("tr");
    eventElement.style.visibility = "collapse";
    eventElement.classList.add("event-view");
    eventElement.setAttribute("id", event.id);
    console.log("create html for event with id " + event.id);
    eventElement.innerHTML = `
    <form id="edit-events-form-${event.id}">
    <td>
      <input id="eventName__input-${event.id}" value="${event.eventName}" />
    </td>
    <td>
      <input id="startDate__input-${event.id}" type="date" value=${event.startDate} />
    </td>
    <td>
      <input id="endDate__input-${event.id}" type="date" value=${event.endDate} />
    </td>
    <td>
      <button type="submit" class="update-event__button">
      ${SaveIcon}
      </button>
      <button type="button" class="cancel-edit-event__button">
        ${CancelIcon}
      </button>
    </td>
    </form>
          `;
    return eventElement;
  }


  updateEvent(evenId, newEvent) {
    const eventElement = document.createElement("tr");
    document.getElementById(`${evenId}-eventName__td`).innerHTML = newEvent["eventName"]
    document.getElementById(`${evenId}-startDate__td`).innerHTML = newEvent["startDate"]
    document.getElementById(`${evenId}-endDate__td`).innerHTML = newEvent["endDate"]

  }

  createEventElement(event) {
    const eventElement = document.createElement("tr");
    eventElement.classList.add("event");
    eventElement.setAttribute("id", event.id);
    eventElement.innerHTML = `
          <th scope="row" id=${event.id}-eventName__td>${event.eventName}</th>
          <td id=${event.id}-startDate__td>${event.startDate}</td>
          <td id=${event.id}-endDate__td>${event.endDate}</td>
          <td>
            <button class="edit-event__button">
             ${EditIcon}
            </button>
            <button class="delete-event__button">
              ${DeleteIcon}
            </button>
          </td>
          `;
    return eventElement;
  }
}

class EventsController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.init();
  }

  init() {
    this.setUpEvents();
    this.fetchEvents();
  }

  setUpEvents() {
    this.setUpSubmitEvent();
    this.setUpEditEvent();
    this.setUpDeleteEvent();
  }

  async fetchEvents() {
    const events = await eventsAPIs.getEvents();
    // this.model.setEvents(events);
    this.view.renderEvents(events);
  }

  setUpDeleteEvent() {
    //event delegation
    this.view.eventList.addEventListener("click", async (e) => {
      const elem = e.target;
      if (elem.classList.contains("delete-event__button")) {
        const eventElem = elem.parentElement.parentElement;
        const deleteId = eventElem.id;
        await eventsAPIs.deleteEvent(deleteId);
        // this.model.deleteEvent(deleteId);
        this.view.removeEventElem(deleteId);
      }
    });
  }

  setUpEditEventToggle() {
    this.view.eventList.addEventListener("click", async (e) => {
      const elem = e.target;
      if (elem.classList.contains("cancel-edit-event__button")) {
        const eventId = elem.parentElement.parentElement.id;
        let editForm = document.getElementById(`edit-events-form-${eventId}`);
        editForm.parentElement.style.visibility = "collapse";
      }
      if (elem.classList.contains("edit-event__button")) {
        const eventId = elem.parentElement.parentElement.id;
        let editForm = document.getElementById(`edit-events-form-${eventId}`);
        editForm.parentElement.style.visibility = "initial";
      }
    });
  }

  
  setUpEditEvent() {
    this.setUpEditEventToggle();

    this.view.eventList.addEventListener("click", async (e) => {
      const elem = e.target;
      if (elem.classList.contains("update-event__button")) {
        const eventId = elem.parentElement.parentElement.id;
        let eventInput = {
          eventName: document.getElementById(`eventName__input-${eventId}`).value,
          startDate: document.getElementById(`startDate__input-${eventId}`).value,
          endDate: document.getElementById(`endDate__input-${eventId}`).value,
        };

        const newEvent = await eventsAPIs.putEvent(eventId, eventInput);

        this.view.updateEvent(eventId, eventInput);
        let editForm = document.getElementById(`edit-events-form-${eventId}`);
        editForm.parentElement.style.visibility = "collapse";
      }
    });
  }

  setUpSubmitEvent() {
    this.view.newEventForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      let eventInput = {
        eventName: this.view.eventNameInput.value,
        startDate: this.view.startDateInput.value,
        endDate: this.view.endDateInput.value,
      };

      if (Object.values(eventInput).some((value) => value === '')) {
        alert('Please fill in all fields.');
        return;
      }

      if (eventInput.startDate > eventInput.endDate) {
        alert('End Date must be after Start Date.');
        return;
      }

      const newEvent = await eventsAPIs.postEvent(eventInput);
      this.view.renderNewEvent(newEvent);
      this.view.clearInput();
    });
  }
}

const eventsView = new EventsView();
const eventsModel = new EventsModel();
const eventsController = new EventsController(eventsView, eventsModel);
