import { shedule } from './shedule.js';
import { LocalStorageService } from './localStorage.js';

const ls = new LocalStorageService();
let itemsInStorage = ls.get('events') ? ls.get('events') : updateStorage(shedule);
const pxTomin = 2; //2px=1min

function updateStorage(shedule) {
  ls.set('events', shedule);
  return shedule;
}
const table = document.querySelector('#shedule-table');

let minutes = [...table.querySelectorAll('.row')].map((n) => {
  return { elemId: n.id, from: n.id.split('-')[0], to: n.id.split('-')[1] };
});

export function loadEvents(items) {
  items.forEach((item) => {
    let findMin = minutes.findIndex((i) => {
      return i.from <= item.start && i.to > item.start;
    });
    let div = document.getElementById(`${minutes[findMin].elemId}`);
    let childDiv = document.createElement('div');
    childDiv.setAttribute('class', 'task');
    childDiv.innerHTML = `${item.title}`;
    childDiv.style.background = `${item.background}`;
    childDiv.style.height = `${item.duration * pxTomin}px`;
    childDiv.style.top = `${item.start * pxTomin - minutes[findMin].from * pxTomin}px`;
    div.appendChild(childDiv);
  });
}

loadEvents(itemsInStorage);
