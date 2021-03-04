function calculate_stamped(weight) {
    if (weight > 0 && weight <= 1.0) {
        return 0.55;
    } else if (weight > 1.0 && weight <= 2.0) {
        return 0.75;
    } else if (weight > 2.0 && weight <= 3.0) {
        return 0.95;
    } else if (weight > 3.0 && weight <= 3.5) {
        return 1.15;
    } else if (weight > 3.5) {
        return calculate_envelope(weight);
    }
}

function calculate_metered(weight) {
    if (weight > 0 && weight <= 1.0) {
        return 0.51;
    } else if (weight > 1.0 && weight <= 2.0) {
        return 0.71;
    } else if (weight > 2.0 && weight <= 3.0) {
        return 0.91;
    } else if (weight > 3.0 && weight <= 3.5) {
        return 1.11;
    } else if (weight > 3.5) {
        return calculate_envelope(weight);
    }
}

function calculate_envelope(weight) {
    if (weight > 0 && weight <= 1.0) {
        return 1.00;
    } else if (weight > 1.0 && weight <= 2.0) {
        return 1.10;
    } else if (weight > 2.0 && weight <= 3.0) {
        return 1.40;
    } else if (weight > 3.0 && weight <= 4.0) {
        return 1.60;
    } else if (weight > 4.0 && weight <= 5.0) {
        return 1.80;
    } else if (weight > 5.0 && weight <= 6.0) {
        return 2.00;
    } else if (weight > 6.0 && weight <= 7.0) {
        return 2.20;
    } else if (weight > 7.0 && weight <= 8.0) {
        return 2.40;
    } else if (weight > 8.0 && weight <= 9.0) {
        return 2.60;
    } else if (weight > 9.0 && weight <= 10.0) {
        return 2.80;
    } else if (weight > 10.0 && weight <= 11.0) {
        return 3.00;
    } else if (weight > 11.0 && weight <= 12.0) {
        return 3.20;
    } else if (weight > 12.0 && weight <= 13.0) {
        return 3.40;
    }
}

function calculate_package(weight) {
    if (weight > 0 && weight <= 4.0) {
        return 4.00;
    } else if (weight > 4.0 && weight <= 8.0) {
        return 4.85;
    } else if (weight > 8.0 && weight <= 12.0) {
        return 5.50;
    } else if (weight > 12.0 && weight <= 13.0) {
        return 6.25;
    }
}

function calculate_price(mail_type, weight) {
    switch (mail_type) {
        case "Stamped":
            return calculate_stamped(weight);
        case "Metered":
            return calculate_metered(weight);
        case "Flats":
            return calculate_envelope(weight);
        default:
            return calculate_package(weight);
    }
}

function get_rate(req, res) {
    let mail_type = req.query.mail_type;
    let weight = Number(req.query.weight);
    let price = Number.parseFloat(calculate_price(mail_type, weight)).toFixed(2);
    if (mail_type === 'Stamped' || mail_type === 'Metered') {
        mail_type = "Letter " + mail_type
    }
    res.render('rate', {
        mail_type: mail_type,
        weight: weight,
        price: price
    });
}

module.exports = {
    get_rate: get_rate
};