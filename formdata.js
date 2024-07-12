document.addEventListener('DOMContentLoaded', () => {
    const name = document.getElementById('name');
    const mail = document.getElementById('mail');
    const phone = document.getElementById('phone');
    const content = document.getElementById('content');
    const submit = document.getElementById('submit');

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        
        const data = {
            name: name.value,
            mail: mail.value,
            phone: phone.value,
            content: content.value,
        };

        postGoogle(data);
    });

    async function postGoogle(data) {
        const formURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfcDzmDyIb7hkT7k_WXxZus3FhsFNrfwept_Zy2YGp9sxk1UQ/formResponse";
        const formData = new FormData();
        formData.append('entry.989168315', data.name); // Thay thế đúng với entry ID trong Google Forms
        formData.append('entry.1208584393', data.mail); // Thay thế đúng với entry ID trong Google Forms
        formData.append('entry.1712757456', data.phone); // Thay thế đúng với entry ID trong Google Forms
        formData.append('entry.491663840', data.content); // Thay thế đúng với entry ID trong Google Forms

        try {
            const response = await fetch(formURL, {
                method: 'POST',
                mode: 'no-cors', // 'no-cors' để không bị chặn bởi chính sách CORS
                body: formData,
            });

            if (response.ok) {
                console.log('Form successfully submitted');
            } else {
                console.log('Error submitting the form');
                alert('Cảm Ơn Bạn Đã Liên Hệ Với Chúng tôi, chúng tôi sẽ liên hệ lại bạn sau!!!')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});
