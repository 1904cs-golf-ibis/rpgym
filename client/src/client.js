const writeEvent = text => {
  // <ul> element
  const parent = document.querySelector('#events')

  // <li> element
  const el = document.createElement('li')
  el.innerHTML = text

  parent.appendChild(el)
}

writeEvent('Battle!')

const sock = io()
sock.on('message', writeEvent)
