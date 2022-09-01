import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
  resetBtnEl: document.querySelector('[data-reset]'),
};

let timeLeft = 0;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  //   minDate: 'today',
  onClose(selectedDates) {
    let date = new Date();
    if (selectedDates[0] <= date) {
      refs.startBtnEl.setAttribute('disabled', '');
      Notify.warning('Please choose a date in the future');
    }
    if (selectedDates[0] > date) {
      timeLeft = selectedDates[0].getTime() - date.getTime();

      refs.startBtnEl.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

refs.startBtnEl.addEventListener('click', convertMs);
refs.stopBtnEl.addEventListener('click', stopCounter);
refs.resetBtnEl.addEventListener('click', resetCounter);

function convertMs(evt) {
  refs.startBtnEl.disabled = true;
  refs.stopBtnEl.disabled = false;
  refs.resetBtnEl.disabled = false;
  updateTime(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft = timeLeft - 1000;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(timeLeft / day);
    const hours = Math.floor((timeLeft % day) / hour);
    const minutes = Math.floor(((timeLeft % day) % hour) / minute);
    const seconds = Math.floor((((timeLeft % day) % hour) % minute) / second);

    refs.daysEl.textContent = addLeadingZero(days);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.minutesEl.textContent = addLeadingZero(minutes);
    refs.secondsEl.textContent = addLeadingZero(seconds);

    if (timeLeft <= 1000) {
      clearInterval(timerInterval);
      refs.stopBtnEl.disabled = true;
      refs.resetBtnEl.disabled = true;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTime(timeLeft) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(timeLeft / day);
  const hours = Math.floor((timeLeft % day) / hour);
  const minutes = Math.floor(((timeLeft % day) % hour) / minute);
  const seconds = Math.floor((((timeLeft % day) % hour) % minute) / second);

  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

function stopCounter(evt) {
  refs.startBtnEl.disabled = false;
  refs.stopBtnEl.disabled = true;
  clearInterval(timerInterval);
}

function resetCounter(evt) {
  refs.startBtnEl.disabled = true;
  refs.resetBtnEl.disabled = true;
  refs.stopBtnEl.disabled = true;
  clearInterval(timerInterval);
  timeLeft = 0;
  updateTime(timeLeft);
}
