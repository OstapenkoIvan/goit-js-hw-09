import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', getInputData);

function getInputData(evt) {
  evt.preventDefault();

  let formData = new FormData(this);

  const dataDelay = Number(formData.get('delay'));
  const dataStep = Number(formData.get('step'));
  const dataAmount = Number(formData.get('amount'));

  let delayValue = dataDelay;

  for (let i = 1; i < dataAmount + 1; i++) {
    createPromise(i, delayValue)
      .then(({ number, delay }) => {
        Notify.success(`✅ Fulfilled promise ${number} in ${delay}ms`);
      })
      .catch(({ number, delay }) => {
        Notify.failure(`❌ Rejected promise ${number} in ${delay}ms`);
      });

    delayValue += dataStep;
  }
}

function createPromise(number, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ number, delay });
      } else {
        reject({ number, delay });
      }
    }, delay);
  });
}
