import './Main.scss';
import * as React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';

type OwnProps = RouteComponentProps<{}>;

class Main extends React.Component<OwnProps, {}> {
    public render() {        
        return <div id="react-root">
            <header>
                <h3>HEADER</h3>
                <div>
                    <h3>Choose a link to check routing:</h3>
                    <nav>
                        <Link to="/">Go Home</Link><br/>
                        <Link to="/somewhere">Go somewhere</Link><br />
                        <Link to="/testsecured">Check secured</Link><br />
                        <Link to="/no_such_page">Go 404</Link><br />
                    </nav>
                </div>
            </header>
            <main>
                <h3>CONTENT</h3>
                <div>
                    {this.props.children}
                </div>
            </main>
            <footer className="footer"> 
                <h3>FOOTER</h3>
            </footer>
        </div>;
    }
}

export default withRouter(Main);