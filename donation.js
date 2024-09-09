document.getElementById('donation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const donationAmount = document.getElementById('donation-amount').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (donationAmount && firstName && lastName && address && email) {
        alert(`Thank you, ${firstName} ${lastName}, for your donation of $${donationAmount}!`);
    } else {
        alert('Please fill in all required fields.');
    }
});

document.querySelectorAll('.remove-card').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const card = this.closest('.card');
        card.remove();
        alert('Card removed successfully!');
    });
});

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    const cardHolder = document.getElementById('cardholder-name').value;
    
    if (cardNumber && expiryDate && cvv && cardHolder) {
        if (validateCardNumber(cardNumber)) {
            const savedCardsContainer = document.querySelector('.saved-cards');
            const newCard = document.createElement('div');
            newCard.className = 'card';
            newCard.innerHTML = `
                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa">
                <input type="text" value="**** **** **** ${cardNumber.slice(-4)}" readonly>
                <button class="remove-card">Remove card</button>
            `;
            savedCardsContainer.appendChild(newCard);
            
            newCard.querySelector('.remove-card').addEventListener('click', function() {
                newCard.remove();
                alert('Card removed successfully!');
            });
            
            alert('Card added successfully!');
            document.getElementById('payment-form').reset();
        } else {
            alert('Please enter a valid card number.');
        }
    } else {
        alert('Please fill in all payment details.');
    }
});

document.getElementById('expiry-date').addEventListener('input', function() {
    const value = this.value.replace(/\D/g, '');
    if (value.length >= 2) {
        this.value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    } else {
        this.value = value;
    }
});

function validateCardNumber(number) {
    number = number.replace(/\D/g, '');
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));
        
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    return (sum % 10) === 0;
}
