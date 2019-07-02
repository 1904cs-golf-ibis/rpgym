document.addEventListener('DOMContentLoaded', () => {
  const socket = io(window.location.origin)
  const button = document.getElementById('message-send')
  const MESSAGE_NEW = 'MESSAGE:NEW'
  button.addEventListener('click', () => {
    const input = document.getElementById('message-input')
    socket.emit(MESSAGE_NEW, input.value)
  })
})
