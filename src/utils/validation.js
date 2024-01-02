function validateName(name) {
    if (!/^[a-zA-Z]{3,18}$/.test(name)) {
        return 'Name must contain only alphabetic characters, min length 3, max length 18.';
    }
    return '';
}