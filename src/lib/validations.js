export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email.trim().length){
        return {
            error: 'Your email is required',
            isValid: false
        }
    }

    if(!emailRegex.test(email.trim())){
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


export const validateName = (name, field, required = true) => {
    if(!name.trim().length && required){
        return {
            error: `Your ${field} is required`,
            isValid: false
        }
    }

    if (name.trim() && (/\s/.test(name.trim()))) {
        return {
          error: `Your ${name} should not contain spaces`,
          status: false,
        };
      }

    return {
        isValid: true,
        error: '',
    }

}


export const validateDate = (date, required = true) => {
    const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
    if(!date.trim().length && required){
        return {
            error: 'Your date of birth is required',
            isValid: false
        }
    }

    if(date.trim().length && !dateFormat.test(date.trim())){
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
        return {
            error: 'Your password is required',
            isValid: false
        }
    }

    if (/\s/.test(password.trim())) {
        return {
          error: 'Your password should not contain spaces',
          status: false,
        };
      }

    if(password.trim().length < 7){
        return {
            error: 'Your password must be at least 7 characters long',
            isValid: false
        }
    }

    if(!passwordFormat.test(password.trim())){
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
        return {
            error: 'Your password is required',
            isValid: false
        }
    }

    if(!passConf.trim().length){
        return {
            error: 'Your password confirmation is required',
            isValid: false
        }
    }

    if(password.trim() !== passConf.trim()){
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


export const validateNumber = (bvn, name, length) => {
    if(!bvn.trim().length){
        return {
            error: `Your ${name} is required`,
            isValid: false
        }
    }

    if(!/^[0-9]+$/.test(bvn.trim())){
        return {
            error: `Your ${name} must contain numbers only`,
            isValid: false
        }
    }
    
    if(bvn.trim().length !== length){
        return {
            error: `Your ${name} must be ${length} characters long`,
            isValid: false
        }
    }



    return {
        isValid: true,
        error: '',
    }

}