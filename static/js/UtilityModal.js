var dialog = document.getElementById('utilityModal');
if (dialog) {
    dialog.addEventListener('close', (e) => {
        document.getElementById('utilityModal_content').innerHTML = '';
    });
    
    document.body.addEventListener("close-modal", function(evt){
        dialog.close();
    })
}