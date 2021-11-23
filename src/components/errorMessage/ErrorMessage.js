import errorImg from './error.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <img className="error__img" src={errorImg} alt="Error" />
    )
}

export default ErrorMessage;