const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')
tabs.forEach(tab => {
             tab.addEventListener('click', () => {
              const target = document.querySelector
              (tab.dataset.tabTarget)
              tabContents.forEach(tabContent => {
                tabContent.classList.remove('active')
             })
             tabs.forEach(tab => {
              tab.classList.remove('active')
           })
              tab.classList.add('active')
              target.classList.add('active')
             })
})

function clearImages(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function createFib() {
  const n = document.getElementById("fibInput").value;
  const container = document.getElementById("fibContainer");
  clearImages(container); // destroy previous fibonacci tiling before making new one

  // first generate fib sequence and top/left positions
  var a = 0, b = 1;
  var fibSeq = [];
  var top = 0, left = 0;
  var minTop = 0, minLeft = 0;
  var tops = [], lefts = [];
  for (let i = 0; i < n; i++) {
    minTop = Math.min(top, minTop);
    minLeft = Math.min(left, minLeft);
    fibSeq.push(b);
    tops.push(top);
    lefts.push(left);
    const dir = i%4; // 0 = next tile to the right, 1 = next tile up, 2 = next tile left, 3 = next tile down
    if (dir == 0) {
      top -= a;
      left += b;
    } else if (dir == 1) {
      top -= a+b;
      left -= a;
    } else if (dir == 2) {
      left -= a+b;
    } else { // dir == 3
      top += b;
    }
    let c = b;
    b = a + b;
    a = c;
  }
  // make all positions non negative
  tops = tops.map(top => top - minTop);
  lefts = lefts.map(left => left - minLeft);

  const scale = 10;
  for (let i = 0; i < n; i++) {
    const rand = Math.floor(Math.random() * 100); // random query param to stop image caching (and get new cats)
    const img = document.createElement("img");
    const size = fibSeq[i]*scale;
    img.src = 'https://cataas.com/cat?width=' + size + '&height=' + size + '&rand=' + rand;
    img.style.position = 'absolute';
    img.style.top = tops[i]*scale + 'px';
    img.style.left = lefts[i]*scale + 'px';
    img.style.width = size + 'px'; // cat images only go up to 1000x1000 so we need to stretch them out.......
    img.style.height = size + 'px';
    container.appendChild(img);
  }
}