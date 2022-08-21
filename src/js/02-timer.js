import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  startBtnEl: document.querySelector('[data-start]'),
};
let date = new Date();
let timeLeft = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  //   minDate: 'today',
  onClose(selectedDates) {
    if (selectedDates[0] <= date) {
      refs.startBtnEl.setAttribute('disabled', '');
      Notify.warning('Please choose a date in the future');
    }
    if (selectedDates[0] > date) {
      timeLeft = selectedDates[0].getTime() - date.getTime();

      refs.startBtnEl.removeAttribute('disabled', '');
    }
  },
};
flatpickr('#datetime-picker', options);

refs.startBtnEl.addEventListener('click', convertMs);

function convertMs(evt) {
  let storageObj = {};
  updateTime(timeLeft);

  let timerInterval = setInterval(() => {
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

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
    }

    storageObj = {
      days,
      hours,
      minutes,
      seconds,
    };
    console.log(storageObj);
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

  storageObj = {
    days,
    hours,
    minutes,
    seconds,
  };
}
