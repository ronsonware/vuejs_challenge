export default {
  redirect (ths, to) {
    ths.$router.push(to)
  },
  showToast (msg) {
    var x = document.getElementById('snackbar')
    x.innerHTML = msg
    x.className = 'show'
    setTimeout(function () { x.className = x.className.replace('show', '') }, 3000)
  }
}
