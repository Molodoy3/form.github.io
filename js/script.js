window.onload = function () {
    const form = document.querySelector('#form');
    if(form){
        form.addEventListener('submit', formSend);
        async function formSend(e){
            let errors = formValidate(form);
            let formData = new formData(form);
            formData.append('image', formImage.files[0]);
            if(errors === 0){
                form.classList.add('sending');
                let response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                });
                if(response.ok){
                    let result = await response.json();
                    alert(result.message);
                    formImagePreview.innerHTML = '';
                    form.reset();
                    form.classList.remove('sending');
                } else{
                    alert("Ошибка");
                    form.classList.remove('sending');
                }
            } else{
                alert('Заполните обязательные поля');
            }
            e.preventDefault();
        }
        function formValidate(form){
            let errors = 0;
            const formReq = document.querySelectorAll('.req');
            
            if(formReq.length){
                for(let index = 0; index < formReq.length; index++){
                    const input = formReq[index];
                    formRemoveError(input);

                    if(input.classList.contains('email')){
                        if(emailTest(input)){
                            formAddError(input);
                            errors++;
                        }
                    } else if(input.classList.contains('req_checkbox') && input.checked === false){
                        formAddError(input);
                        errors++;
                    } else if(input.value === ''){
                        formAddError(input);
                        errors++;
                    }
                }
                return(errors);
            }

        }
        function formRemoveError(input){
            input.classList.remove('error');
            input.parentElement.classList.remove('error');
        }
        function formAddError(input){
            input.classList.add('error');
            input.parentElement.classList.add('error');
        }
        function emailTest(input){
            return !/^\w+([\.*]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        }

        const formImage = document.getElementById('formImage');
        const formImagePreview = document.getElementById('formImagePreview');
        if(formImage && formImagePreview){
            formImage.addEventListener('change', function() {
                uploadFile(formImage.files[0]);
            });
        }
        function uploadFile(file){
            if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                alert('Разрешены только изображения.');
                formImage.value = '';
                return;
            }
            if(file.size > 2 * 1024 * 1024){
                alert('Файл не может быть более 2 Mb.');
                return;
            }
    
            var reader = new FileReader();
            reader.onload = function(e) {
                formImagePreview.innerHTML = `<img src="${e.target.result}" alt="ваше фото">`;
            }
            reader.onerror = function(e){
                alert('Ошибка');
            };
            reader.readAsDataURL(file);
        }
    }
}
