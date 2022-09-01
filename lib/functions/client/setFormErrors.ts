import type {UseFormSetError} from 'react-hook-form';

import type {FormErrors} from '@/types/CustomTypes';

const setFormErrors = (SetErrorFunction: UseFormSetError<any>, errors: FormErrors) => {
    Object.entries(errors).forEach(([key, value]) => {
        SetErrorFunction(key, { type: 'manual', message: value[0] });
    });
};

export default setFormErrors;