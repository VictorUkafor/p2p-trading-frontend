
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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


export const validateName = (name, field) => {
    if(!name.trim().length){
        console.log(`Your ${field} is required`);
        return {
            error: `Your ${field} is required`,
            isValid: false
        }
    }

    return {
        isValid: true,
        error: '',
    }

}


export const validateDate = (date) => {
    const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
    if(!date.trim().length){
        console.log('Your date of birth is required');
        return {
            error: 'Your date of birth is required',
            isValid: false
        }
    }

    if(!dateFormat.test(date.trim())){
        console.log('Your date of birth must be valid');
        return {
            error: 'Your date of birth must be valid',
            isValid: false
        }
    }

    return {
        isValid: true,
        error: '',
    }

}


export const validatePassword = (password) => {
    const passwordFormat = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
    if(!password.trim().length){
        console.log('Your password is required');
        return {
            error: 'Your password is required',
            isValid: false
        }
    }

    if (/\s/.test(password.trim())) {
        return {
          message: 'Your password should not contain spaces',
          status: false,
        };
      }

    if(password.trim().length < 7){
        console.log('Your password must be at least 7 characters long');
        return {
            error: 'Your password must be at least 7 characters long',
            isValid: false
        }
    }

    if(!passwordFormat.test(password.trim())){
        console.log('Your password contain at least a letter and a number');
        return {
            error: 'Your password contain at least a letter and a number',
            isValid: false
        }
    }

    return {
        isValid: true,
        error: '',
    }

}


export const validatePassConf = (password, passConf) => {
    if(!password.trim().length){
        console.log('Your password is required');
        return {
            error: 'Your password is required',
            isValid: false
        }
    }

    if(!passConf.trim().length){
        console.log('Your password confirmation is required');
        return {
            error: 'Your password confirmation is required',
            isValid: false
        }
    }

    if(password.trim() !== passConf.trim()){
        console.log('Your passwords do not match');
        return {
            error: 'Your passwords do not match',
            isValid: false
        }
    }

    return {
        isValid: true,
        error: '',
    }

}