import './SecuredPanel.scss';
import * as React from 'react';
import * as SecureStore from '../../store/testSecured';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';

// This is the current trend in construction of react components. All should be function component due to speed increace and more simplicity
// This one uses new hooks instead of older connect function.
export const SecuredPanel: React.FC = () => {
    const dispatch = useDispatch();
    const { errorMessage, isLoading, response } = useSelector(state => (state as ApplicationState).secured);    

    React.useEffect(() => {
        // clear existing message when mounting component
        dispatch(SecureStore.clearSecuredDataAction());
    }, []);

    return <div className="messagePanel">
        <header>
            <h3>To try getting to server secured route, with or without expected header key:</h3>   
            <span>
                <button onClick={(ev) => dispatch(SecureStore.fetchSecuredDataAction("topsecret"))}>Get with secret</button>
                <button onClick={(ev) => dispatch(SecureStore.fetchSecuredDataAction())}>Get without secret</button>
            </span>
            <label className={`fetchingDataLabel ${isLoading ? 'visible' : ''}`}>fetching data...</label>
            <br />
            <label className="responseLabel">{response}</label>
            {errorMessage && <label className="errorLabel">{errorMessage}</label>}
        </header>
    </div>;
}