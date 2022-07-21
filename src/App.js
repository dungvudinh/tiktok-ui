import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Fragment } from 'react';
import "~/App.css";
import {publicRoutes} from '~/routes';
import {DefaultLayout} from '~/Layout';

function App() {

  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          {publicRoutes.map((route, index)=>{
            const Page = route.component;
            var Layout;
            if(route.layout) Layout = route.layout;
            else if(route.layout===null) Layout = Fragment;
            else Layout =DefaultLayout;
            return (
              <Route key={index} path={route.path} element ={<Layout><Page /></Layout>} />
            )
          }
          )}
          <Route path='*'  element ={<h1>404 NOT FOUD</h1>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
