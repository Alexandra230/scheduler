import { LocalStorageService } from './localStorage.js';
const ls = new LocalStorageService();
let row = document.querySelectorAll('.row');
let modal = document.getElementById('add-event-modal');
let edit = document.getElementById('editting-event-modal');
let newName = document.getElementById('editEventName');
let newStart = document.getElementById('newStart');
let newEnd = document.getElementById('newEnd');

for (let i = 0; i < row.length; i++) {
  row[i].onclick = function (e) {
    let composed = e.composedPath();
    let element = composed.find((el) => (el = 'div.task'));
    if (element.classList == 'row') {
      if (modal.style.display === 'block') {
        modal.style.display = 'none';
      } else {
        modal.style.display = 'block';
      }
    } else if (element.classList == 'task') {
      newName.value = element.innerText;
      let min = element.parentNode.id.split('-').splice(0, 1);
      let newHH = (480 + Number(min) + Number(element.style.top.match(/\d+/)) / 2) / 60;
      newStart.value = eventStartTime(newHH);
      let dur = Number(element.style.height.match(/\d+/)) / 2;
      newEnd.value = eventEndTime(newStart.value, dur);
      let itemsInStorage = ls.get('events');
      itemsInStorage.find((el) => (el.title === newName.value ? (el.status = 'edit') : false));
      ls.set('events', itemsInStorage);
      if (edit.style.display === 'block') {
        edit.style.display = 'none';
      } else {
        edit.style.display = 'block';
      }
    }
  };
}
function eventStartTime(hh) {
  let h = `${hh}`;
  let hours = Number(h.split('.').splice(0, 1));
  let minutes = Math.round((hh - hours) * 60);
  let resHH;
  let resMM;
  if (hours < 10) {
    resHH = '0' + hours;
  } else {
    resHH = hours;
  }
  if (minutes < 10) {
    resMM = '0' + minutes;
  } else {
    resMM = minutes;
  }

  return [resHH, resMM].join(':');
}
function eventEndTime(start, duration) {
  let hh = Number(start.split(':').splice(0, 1));
  let mm = Number(start.split(':').splice(1, 1)) + duration;

  let resmm = mm % 60;
  let reshh = hh + Math.floor(mm / 60);
  if (reshh < 10) {
    reshh = '0' + reshh;
  } else {
    reshh = reshh;
  }
  if (resmm < 10) {
    resmm = '0' + resmm;
  } else {
    resmm = resmm;
  }
  return [reshh, resmm].join(':');
}
let form = document.getElementById('modal-form-container');
form.addEventListener('click', function (evn) {
  evn.stopPropagation();
});
let editForm = document.getElementById('editting-container');
editForm.addEventListener('click', function (evn) {
  evn.stopPropagation();
});

modal.addEventListener('click', function () {
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }

  document.myForm.reset();
});
edit.addEventListener('click', function () {
  if (edit.style.display === 'block') {
    edit.style.display = 'none';
  } else {
    edit.style.display = 'block';
  }
  let itemsInStorage = ls.get('events');
  itemsInStorage.find((el) => (el.status ? delete el.status : false));
  ls.set('events', itemsInStorage);
  document.edittingForm.reset();
});
