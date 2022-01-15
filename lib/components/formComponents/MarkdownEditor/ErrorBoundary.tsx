import {Component, ErrorInfo} from 'react';

interface Props {

}

class ErrorBoundary extends Component<Props, { error: null | Error }> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: null
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { error: error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (!!this.state.error) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <p>{this.state.error.message}</p>
                </div>
            );
        }
        return <>{this.props.children}</>;
    }
}

export default ErrorBoundary;