import "../styles/globals.scss";
import store from "../store";
import { Provider } from "react-redux";
import {Container} from  'react-bootstrap'

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      
        <Component {...pageProps} />
    

    </Provider>
  );
}

export default MyApp;
