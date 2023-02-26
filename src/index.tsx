import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import AppPlusRedux from "./AppPlusRedux";
import {Provider} from "react-redux";
import {store} from "./10_store/10_store";

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);

//we must encapsulate the app component into <Provider><Provider/> HOC and
//pass the created store object as props
root.render(<Provider store={store}><AppPlusRedux/></Provider> );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

