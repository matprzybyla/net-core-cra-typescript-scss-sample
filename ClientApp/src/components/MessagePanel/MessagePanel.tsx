import './MessagePanel.scss';

import * as React from 'react';
import * as TestStore from '../../store/test';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { SimpleList } from '../SimpleList';
import { ThunkDispatch } from 'redux-thunk';

type StateProps = { 
    dataFromStore: string[],
    isLoading: boolean,
    errorMessage?: string
};
type DispatchProps = {
    requestNewData: () => Promise<void>,
    clearData: () => void
}
type OwnProps = {};
type MessagePanelProps = StateProps & DispatchProps & OwnProps;
type MessagePanelState = {};

class MessagePanel extends React.Component<MessagePanelProps, MessagePanelState> {  
    public render() {        
        return <div className="messagePanel">
            <header>
                <h3>Click to fetch new messages:</h3>
                <span>
                    <button onClick={(ev) => this.props.requestNewData()}>Fetch button</button>
                    <button onClick={(ev) => this.props.clearData()}>Clear button</button>
                </span>
                <label className={`fetchingDataLabel ${this.props.isLoading ? 'visible' : ''}`}>fetching data...</label>
                {this.props.errorMessage && <label className="errorLabel">{this.props.errorMessage}</label>}
            </header>
            <section>
                <h3>List of messages in Redux store:</h3>
                <SimpleList listItems={this.props.dataFromStore}></SimpleList>
            </section>
        </div>;
    }
}


const mapStateToProps = (state: ApplicationState, ownProps: OwnProps): StateProps => {
    return {
        dataFromStore: state.test.apiResponses,
        isLoading: state.test.isLoading,
        errorMessage: state.test.errorMessage
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<TestStore.State, any, TestStore.AcceptedAction>) => {
    return {
        requestNewData: () => dispatch(TestStore.fetchDataAction()),
        clearData: () => dispatch(TestStore.clearDataAction()),
    };
  };

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState> (mapStateToProps, mapDispatchToProps)(MessagePanel)