const sixes = [];
const doubleSixes = [];
const twelves = [];
const twenties = [];

const getRandomNumber = function(max) {
  const rand = Math.random();
  const range = rand * max;
  const result = Math.ceil(range);
  return result;
};

const sortByNumber = function(arr) {
  const byNumber = function(item1, item2) {
    return item1 - item2;
  };
  return arr.slice().sort(byNumber);
};

// ========================================================================================

const mean = arr => {
  if (!arr.length) return 'NA';

  let sum = 0;
  for (let num of arr) {
    sum += num;
  }

  return (sum / arr.length).toFixed(2);
};

const median = arr => {
  if (!arr.length) return 'NA';

  const sorted = sortByNumber(arr);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  } else {
    let average = (sorted[mid - 1] + sorted[mid]) / 2;
    return average.toFixed(2);
  }
};

const mode = arr => {
  if (!arr.length) return 'NA';

  const freq = {};
  let maxFreq = 0;

  for (let num of arr) {
    freq[num] = (freq[num] || 0) + 1;
    if (freq[num] > maxFreq) {
      maxFreq = freq[num];
    }
  }

  const modes = [];
  for (let num in freq) {
    if (freq[num] === maxFreq) {
      modes.push(num);
    }
  }

  return modes.join(', ');
};

// ============================================================================================

const d6 = document.querySelector('#d6 img')
const doubleD6Imgs = document.querySelectorAll('#double-d6 img')
const d12 = document.querySelector('#d12 img')
const d20 = document.querySelector('#d20 img')
console.log('d20:', d20)
const resetBtn = document.querySelector('#reset-button')
const healthBarContainer = document.querySelector('.health-bar-container')

// =============================================================================================

const updateStats = (arr, id) => {
  const meanEl = document.querySelector(`#${id} .mean`)
  const medianEl = document.querySelector(`#${id} .median`)
  const modeEl = document.querySelector(`#${id} .mode`)

  if (meanEl) meanEl.textContent = mean(arr)
  if (medianEl) medianEl.textContent = median(arr)
  if (modeEl) modeEl.textContent = mode(arr)
}

// ==============================================================================================

const rollHandler = (dieType, sides, image, arr, imgPath) => {
  const roll = getRandomNumber(sides)
  arr.push(roll)
  if (image) image.src = `${imgPath}/${roll}.png`
  updateStats(arr, dieType)
  updateHealthBar()
}

// ==============================================================================================

if (d6) d6.addEventListener('click', () => rollHandler('d6', 6, d6, sixes, 'images/d6'))

if (doubleD6Imgs.length === 2) {
  doubleD6Imgs.forEach(img => img.addEventListener('click', () => {
    const r1 = getRandomNumber(6)
    const r2 = getRandomNumber(6)
    doubleSixes.push(r1 + r2);
    doubleD6Imgs[0].src = `images/d6/${r1}.png`
    doubleD6Imgs[1].src = `images/d6/${r2}.png`
    updateStats(doubleSixes, 'double-d6')
    updateHealthBar()
  }))
}

if (d12) d12.addEventListener('click', () => rollHandler('d12', 12, d12, twelves, 'images/numbers'))
if (d20) d20.addEventListener('click', () => rollHandler('d20', 20, d20, twenties, 'images/numbers'))


// ======================== Zelda-style hearts =============================================================

let isResetting = false

const updateHealthBar = () => {
  const totalRolls = sixes.length + doubleSixes.length + twelves.length + twenties.length
  const maxRolls = 10
  const fullHearts = Math.floor((totalRolls / maxRolls) * 10)
  const isLowHealth = fullHearts <= 10
  if (healthBarContainer) {
    healthBarContainer.innerHTML = ""
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('div')
      heart.classList.add('heart')
       if (i >= 10 - fullHearts) heart.classList.add('filled')
       if (isLowHealth && i >= 10 - fullHearts) {
      heart.classList.add('low-health')
      void heart.offsetWidth 
    }
  healthBarContainer.appendChild(heart)
}
  }

  if (totalRolls >= maxRolls && !isResetting) {
    isResetting = true
    setTimeout(() => {
      resetAll()
      isResetting = false
    }, 300)
  }
}


// ==========================================================================================================

const resetAll = () => {
  console.log('Resetting now...') 

  sixes.splice(0)
  doubleSixes.splice(0)
  twelves.splice(0)
  twenties.splice(0)

{
  ['d6', 'double-d6', 'd12', 'd20'].forEach(id => {
   const container = document.querySelector(`#${id}`);
    if (!container) return
    container.querySelectorAll('.mean, .median, .mode').forEach(el => el.textContent = 'NA')
  })
}

  
  if (d6) d6.src = 'images/start/d6.png?' + Date.now()
if (doubleD6Imgs.length === 2) {
  doubleD6Imgs[0].src = 'images/start/d6.png?' + Date.now()
  doubleD6Imgs[1].src = 'images/start/d6.png?' + Date.now()
}
if (d12) d12.src = 'images/start/d12.png?' + Date.now()
if (d20) d20.src = 'images/start/d20.png?' + Date.now()

  updateHealthBar()
 
}


if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    resetBtn.disabled = true
    setTimeout(() => {
      resetAll()
      resetBtn.disabled = false
    }, 300) 
  })
}
