import React from 'react';

import { Provider } from 'react-redux';
import User from './src/features/user/User';

import { store } from './src/app/store';

function App() {
  return (
    <Provider store={store}>
      <User />
    </Provider>
  )
}

export default App;
