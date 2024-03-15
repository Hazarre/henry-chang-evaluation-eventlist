
const EditIcon = `<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>`


const DeleteIcon = `<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>`

const SaveIcon = `<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z"/></svg>`

const CancelIcon =  `<svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>`

const AddIcon = `<svg focusable viewBox="0 0 24 24" aria-hidden="true xmlns="http://www.w3.org/2000/svg"><path d="M12 6V18M18 12H6" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`

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
    console.log("create html for event with id " + event.id);
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
      console.log("clicked ", e.target)
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

      console.log(eventInput);
      // const title = input.value;
      // if (!title) {
      //   return;
      // }

      const newEvent = await eventsAPIs.postEvent(eventInput);
      // this.model.postEvent(newEvent);
      //   console.log(this.model.getEvents());
      this.view.renderNewEvent(newEvent);
      this.view.clearInput();
    });
  }
}

const eventsView = new EventsView();
const eventsModel = new EventsModel();
const eventsController = new EventsController(eventsView, eventsModel);
