function deleteMod(id) {
    document.getElementById('btn-delete-mod').value = id
  }
  
function confirmDeleteMod() {
    var modId = document.getElementById('btn-delete-mod').value
    window.location = `/api/mod/deleteMod?id=${modId}`

  }