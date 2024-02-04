let btn = document.querySelector('.calc');

function clean() {
    document.querySelectorAll('.resultBx h1 span').forEach(sp => {
        sp.textContent = '--';
    });
}

function validation(year, month, day) {
    let inputs = document.querySelectorAll('.inputBx input');
    let now = new Date();
    let days = year % 4 === 0 ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let validator = true;
    
    inputs.forEach(input => {
        if(input.value === '') {
            input.style.borderColor = 'red';
            input.previousElementSibling.style.color = 'red'; 
            input.nextElementSibling.textContent = 'This field is required';
            clean();
            validator = false;
            return false;
        }
        else {
            input.style.borderColor = 'hsl(0, 0%, 86%)';
            input.previousElementSibling.style.color = 'hsl(0, 1%, 44%)'; 
            input.nextElementSibling.textContent = '';
            
            if(month <= 0 || month > 11) {
                document.getElementById('month').style.borderColor = 'red';
                document.getElementById('month').previousElementSibling.style.color = 'red';
                document.getElementById('month').nextElementSibling.textContent = 'The month number is not between 1-12';
                clean();
                validator = false;
                return false;
            }
            else {
                document.getElementById('month').style.borderColor = 'hsl(0, 0%, 86%)';
                document.getElementById('month').previousElementSibling.style.color = 'hsl(0, 1%, 44%)'; 
                document.getElementById('month').nextElementSibling.textContent = '';
            }

            if(day < 1 || day > days[month] || day > 31) {
                document.getElementById('day').style.borderColor = 'red';
                document.getElementById('day').previousElementSibling.style.color = 'red';
                document.getElementById('day').nextElementSibling.textContent = 'Must be a valid day';
                clean();
                validator = false;
                return false;
            }
            else {
                document.getElementById('day').style.borderColor = 'hsl(0, 0%, 86%)';
                document.getElementById('day').previousElementSibling.style.color = 'hsl(0, 1%, 44%)'; 
                document.getElementById('day').nextElementSibling.textContent = '';
            }

            if(year > now.getFullYear()) {
                document.getElementById('year').style.borderColor = 'red';
                document.getElementById('year').previousElementSibling.style.color = 'red';
                document.getElementById('year').nextElementSibling.textContent = 'Must be in the past';
                clean();
                validator = false;
                return false;
            }
            else if(year == now.getFullYear() && month > now.getMonth() && (month > 0 && month <= 11)) {
                document.getElementById('month').style.borderColor = 'red';
                document.getElementById('month').previousElementSibling.style.color = 'red';
                document.getElementById('month').nextElementSibling.textContent = 'Must be in the past';
                clean();
                validator = false;
                return false;
            }
            else if(year == now.getFullYear() && month == now.getMonth() && day > now.getDate()) {
                document.getElementById('day').style.borderColor = 'red';
                document.getElementById('day').previousElementSibling.style.color = 'red';
                document.getElementById('day').nextElementSibling.textContent = 'Must be in the past';
                clean();
                validator = false;
                return false;
            }
            else {
                document.getElementById('year').style.borderColor = 'hsl(0, 0%, 86%)';
                document.getElementById('year').previousElementSibling.style.color = 'hsl(0, 1%, 44%)'; 
                document.getElementById('year').nextElementSibling.textContent = '';
                document.getElementById('month').style.borderColor = 'hsl(0, 0%, 86%)';
                document.getElementById('month').previousElementSibling.style.color = 'hsl(0, 1%, 44%)'; 
                document.getElementById('month').nextElementSibling.textContent = '';
                document.getElementById('day').style.borderColor = 'hsl(0, 0%, 86%)';
                document.getElementById('day').previousElementSibling.style.color = 'hsl(0, 1%, 44%)'; 
                document.getElementById('day').nextElementSibling.textContent = '';        
            }
        }
    });

    return validator;
}

btn.addEventListener('click', () => {
    let day = document.getElementById('day').value;
    let month = document.getElementById('month').value-1;
    let year = document.getElementById('year').value;
    if(validation(year, month, day)) {
        let now = new Date();
        let date = new Date(year, month, day);
        let diff = Math.floor((now - date)/(24*60*60*1000));
        let years = Math.floor(diff/365.25);
        let months = Math.floor((diff - years*365.25)/30.4);
        date = new Date(date.setMonth(date.getMonth()+months));
        date = new Date(date.setFullYear(date.getFullYear()+years));
        let days = Math.floor((now-date)/(24*60*60*1000));
        document.querySelector('.yy span').textContent = years;
        document.querySelector('.mm span').textContent = months;
        document.querySelector('.dd span').textContent = days;
    }
})