import { useEffect, useState } from "react";
import "./Alert.css";

const Alert = ({
    type = "success",
    response,
    isQuestion,
    setAnswer,
    showAlert,
    setShowAlert
}) => {

    const [hideAlert, setHideAlert] = useState('')

    const closeAlert = () => {
        setHideAlert('hide-alert');
        setTimeout(() => {
            setHideAlert('');
            setShowAlert('')
        }, 10)
    }

    useEffect(() => {

        if (!response) return;

        if (isQuestion) return;

        const timer = setTimeout(() => {
            closeAlert?.();
        }, 2000);

        return () => clearTimeout(timer);

    }, [response, closeAlert, isQuestion]);

    if (!response) return null;

    return (
        <div className={`alert ${showAlert} ${hideAlert} ${type} `}>
            {response}
            {
                isQuestion && <div className="alert-btns">
                    <button onClick={() => { setAnswer(true); closeAlert?.() }} className="accept-btn">
                        Bəli
                    </button>
                    <button onClick={() => { setAnswer(false); closeAlert?.() }} className="cancel-btn">
                        Xeyr
                    </button>
                </div>
            }
        </div>
    );
};

export default Alert;