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

class EventsView {
  constructor() {
    this.newEventForm = document.querySelector("#new-events-form");
    this.newEventFormDisplay = document.querySelector(
      "#new-events-form__tfoot"
    );
    this.addEventButton = document.querySelector("#add-event__button");
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
  }

  createEventElement(event) {
    const eventElement = document.createElement("tr");
    eventElement.classList.add("event");
    eventElement.setAttribute("id", event.id);
    eventElement.innerHTML = `
          <th scope="row">${event.eventName}</th>
          <td>${event.startDate}</td>
          <td>${event.endDate}</td>
          <td><button >Edit</button></td>
          <td><button class="event__del-btn">Delete</button></td>
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
      if (elem.classList.contains("event__del-btn")) {
        const eventElem = elem.parentElement.parentElement;
        const deleteId = eventElem.id;
        await eventsAPIs.deleteEvent(deleteId);
        // this.model.deleteEvent(deleteId);
        this.view.removeEventElem(deleteId);
      }
    });
  }
  

  setUpEditEvent() {
    //event delegation
    this.view.eventList.addEventListener("click", async (e) => {
      const elem = e.target;
      if (elem.classList.contains("event__edit-btn")) {
        const eventElem = elem.parentElement.parentElement;
        const editId = eventElem.id;
        // await eventsAPIs.postEvent(deleteId);
        // this.model.deleteEvent(deleteId);
        // this.view.removeEventElem(deleteId);
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
