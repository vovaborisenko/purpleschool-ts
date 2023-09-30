/**
 * Необходимо сделать тип для результата валидации формы основываясь на типа формы
 */

interface IForm {
    name: string;
    password: string;
}

type Validation<Type> = {
    [Prop in keyof Type]: {
        isValid: true;
    } | {
        isValid: false;
        errorMessage: string;
    };
};

const form: IForm = {
    name: 'Name',
    password: '123'
};

const validation: Validation<IForm> = {
    name: { isValid: true },
    password: { isValid: false, errorMessage: 'message error' }
};
