import { LocalStorageService } from './localStorage.js';
import { loadEvents } from './main.js';

const ls = new LocalStorageService();
let form = document.getElementById('modal-form');
let editForm = document.getElementById('editting-form');
let edit = document.getElementById('editting-event-modal');
let modal = document.getElementById('add-event-modal');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let nameEv = document.getElementById('eventName').value;
  let from = document.getElementById('start').value;
  let to = document.getElementById('end').value;
  let color = document.getElementById('favcolor').value;
  if (checkName(nameEv) && checkTime(from, to)) {
    let itemsInStorage = ls.get('events');
    let fromHH = from.split(':').splice(0, 1);
    let fromMM = from.split(':').splice(1, 1);
    let toHH = to.split(':').splice(0, 1);
    let toMM = to.split(':').splice(1, 1);
    let fromTime = Number(fromHH) * 60 + Number(fromMM);
    let toTime = Number(toHH) * 60 + Number(toMM);
    let newDuratuin = toTime - fromTime;
    let newStart = fromTime - 480;
    let newEvent = {
      start: newStart,
      duration: newDuratuin,
      title: nameEv,
      background: color,
    };
    itemsInStorage.push(newEvent);
    loadEvents([newEvent]);
    ls.set('events', itemsInStorage);
    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
    }
  } else {
    console.log('goat');
  }
});

editForm.addEventListener('submit', function () {
  let newNameEv = document.getElementById('editEventName').value;
  let newFrom = document.getElementById('newStart').value;
  let newTo = document.getElementById('newEnd').value;
  let newColor = document.getElementById('newfavcolor').value;
  if (checkName(newNameEv) && checkTime(newFrom, newTo)) {
    let itemsInStorage = ls.get('events');
    let fromHH = newFrom.split(':').splice(0, 1);
    let fromMM = newFrom.split(':').splice(1, 1);
    let toHH = newTo.split(':').splice(0, 1);
    let toMM = newTo.split(':').splice(1, 1);
    let fromTime = Number(fromHH) * 60 + Number(fromMM);
    let toTime = Number(toHH) * 60 + Number(toMM);
    let newDuratuin = toTime - fromTime;
    let newStart = fromTime - 480;
    console.log(itemsInStorage);
    itemsInStorage.find((el) => {
      if (el.status == 'edit') {
        el.start = newStart;
        el.duration = newDuratuin;
        el.title = newNameEv;
        el.background = newColor;
      }
    });
    ls.set('events', itemsInStorage);

    if (edit.style.display === 'block') {
      edit.style.display = 'none';
      let itemsInStorage = ls.get('events');
      itemsInStorage.find((el) => (el.status ? delete el.status : false));
      ls.set('events', itemsInStorage);
    } else {
      edit.style.display = 'block';
    }
  } else {
    alert('You have problems...');
  }
});

let delBtn = document.getElementById('delete');
delBtn.addEventListener('click', function (event) {
  let itemsInStorage = ls.get('events');
  let newStor = itemsInStorage.filter((item) => item.status !== 'edit');
  ls.set('events', newStor);
  if (edit.style.display === 'block') {
    edit.style.display = 'none';
    let itemsInStorage = ls.get('events');
    itemsInStorage.find((el) => (el.status ? delete el.status : false));
    ls.set('events', itemsInStorage);
  } else {
    edit.style.display = 'block';
  }
});
function checkName(name) {
  if (name) {
    return true;
  } else {
    alert('Name field is empty');
    return false;
  }
}
function checkTime(start, end) {
  let reg = /^([0][8-9](:[0-5]\d)|1[0-6](:[0-5]\d)|1[7](:0[0]))$/;
  let regend = /^([0][8-9](:[1-5]\d)|1[0-6](:[0-5]\d)|1[7](:[0-3][0-9]))$/;
  let checkStart = reg.test(start);
  let checkEnd = regend.test(end);
  if (checkStart && checkEnd) {
    let fromHH = start.split(':').splice(0, 1);
    let fromMM = start.split(':').splice(1, 1);
    let toHH = end.split(':').splice(0, 1);
    let toMM = end.split(':').splice(1, 1);
    if (fromHH < toHH) {
      return true;
    } else if (Number(fromHH) == Number(toHH)) {
      if (fromMM < toMM) {
        return true;
      } else {
        alert('Start time must be smaller than end');
        return false;
      }
    } else {
      alert('Start time must be smaller than end');
      return false;
    }
  } else {
    alert('Enter valid time HH:MM');
  }
}
