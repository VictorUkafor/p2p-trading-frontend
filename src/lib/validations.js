const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {

    if(!email.trim().length){
        console.log('Your email is required');
        return {
            error: 'Your email is required',
            isValid: false
        }
    }

    if(!emailRegex.test(email.trim())){
        console.log('Your email must be valid');
        return {
            error: 'Your email must be valid',
            isValid: false
        }
    }

    return {
        isValid: true,
        error: '',
    }

}


export const validateTerm = (term) => {
    if(term !== true){
        console.log('You must agree to our Privacy Policy');
        return {
            error: 'You must agree to our Privacy Policy',
            isValid: false
        }
    }

    return {
        isValid: true,
        error: '',
    }    
}