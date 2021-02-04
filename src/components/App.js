import logo from '../logo.svg';
import '../styles/App.css';
import '../styles/Book.css';
import 'antd/dist/antd.css';

import {Card, Col, Row} from 'antd';
import BookCard from "./BookCard";

function App() {

  return (
      <>
        <h1 className='title'>Libros</h1>
        <div>

          <BookCard
          />

        </div>
      </>
  );
}


export default App;
