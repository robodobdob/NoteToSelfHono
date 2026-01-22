var dialog = document.getElementById('utilityModal');
if (dialog) {
    dialog.addEventListener('close', () => {
        document.getElementById('utilityModal_content').innerHTML = '';
    });
    
    document.body.addEventListener("close-modal", function(){
        dialog.close();
    })
}