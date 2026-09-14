import React from 'react';
import { Compass } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Waypoint render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-coral-soft flex items-center justify-center mb-6">
            <Compass className="w-8 h-8 text-coral-deep" strokeWidth={1.75} />
          </div>
          <h1 className="font-display text-display-sm font-bold mb-2">Off the map</h1>
          <p className="text-sm text-ink-soft mb-6 max-w-xs">
            The page hit an unexpected error. Reloading usually fixes it.
          </p>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}