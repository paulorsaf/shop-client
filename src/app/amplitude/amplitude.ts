import amplitude from 'amplitude-js';
import Amplitude from '@redux-beacon/amplitude';
import { createMetaReducer, createMiddleware } from 'redux-beacon';
import { analyticsEventsMap } from './analytics.events';
import { environment } from 'src/environments/environment';

const amplitudeInstance = amplitude.getInstance();
if (environment.production) {
    amplitudeInstance.init('b5a9acac96ec43079222f253379037b1')
}

const target = Amplitude({ instance: amplitudeInstance });

export const amplitudeMiddleware = createMiddleware(analyticsEventsMap, target);
export const amplitudeMetaReducer = createMetaReducer(analyticsEventsMap, target);