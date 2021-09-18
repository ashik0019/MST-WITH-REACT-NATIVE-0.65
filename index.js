/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { registerRNAsyncDriver } from './src/utils/storage';
registerRNAsyncDriver();

LogBox.ignoreLogs(['Require cycle', 'currentlyFocusedField is deprecated']);

AppRegistry.registerComponent(appName, () => App);
