import React, { useDebugValue, useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import ListRender from './components/ListRender';
// import Alert from './components/Alert'; // Uncomment this line if you have the Alert component

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  // const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const [checkEditItem, setCheckEditItem] = useState(false);
  const [editId, setEditId] = useState(null);

  const date = new Date()
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Function to update the current time every minute
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    // Set up an interval to update the time every minute
    const intervalId = setInterval(updateTime, 60000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const getQuote = () => {
    axios.get(
      'https://api.api-ninjas.com/v1/quotes?category=attitude',
      {
        headers: { 'X-Api-Key': 'g9Flz2ZihLpOAdgC4LYdSw==9eCc0TIpoznnyOx6' },
      }
    ).then((response) => {
      setQuote(response.data[0].quote);
      setAuthor(response.data[0].author)
    })
      .catch((error) => {
        console.error('Error fetching quote:', error);
      });
  };

  const [quote, setQuote] = useState('No rational argument will have a rational effect on a man who does not want to adopt a rational attitude.');
  const [author, setAuthor] = useState('Karl Popper')

  const submitData = async (e) => {
    e.preventDefault();

    if (name === '') {
      // setAlert({ show: true, msg: 'กรุณาป้อนข้อมูล', type: 'error' })
    } else if (checkEditItem && name !== '') {
      const result = list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: name };
        }
        return item;
      });
      setList(result);
      setName('');
      setCheckEditItem(false);
      setEditId(null);
      // setAlert({ show: true, msg: 'แก้ไขรายการเรียบร้อย', type: 'success' })
    } else {
      getQuote()
      const newItem = {
        id: uuidv4(),
        title: name,
      };
      setList([...list, newItem])
      setName('');
      // setAlert({ show: true, msg: 'เพิ่มรายการสำเร็จ', type: 'success' })
    }
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    // setAlert({ show: true, msg: 'ลบรายการสำเร็จ', type: 'error' })
  };

  const editItem = (id) => {
    setCheckEditItem(true);
    setEditId(id);

    const searchItem = list.find((item) => item.id === id);
    setName(searchItem.title);

  };

  return (
    <>
      <nav>
        <p className='nav-app-logo'>TaskMate.</p>

        <div className='github-nav'>
          <div>
            <p>Check my <b>Github!</b></p>
          </div>
          <a href='https://github.com/rapeepattr/TaskMate' target='blank'>
            <svg className='github-logo' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
          </a>
        </div>
      </nav>

      <div className='dashboard'>
        <section className='left-section'>
          <div className='container'>
            <section className='container-date'>
              <h2>{date.getDate()}</h2>
              <p>{months[new Date().getMonth()]}</p>
            </section>
            <section className='container-year'>
              <h2>{date.getFullYear()}</h2>
              <p>Year</p>
            </section>
          </div>

          <div className='container-remain'>
            <h2>{list.length} In progress</h2>
          </div>

          <section className='container-info'>
            <h4>What is TaskMate ?</h4>
            <p>✅ Plan your day seamlessly.</p>
            <p>✅ Stay motivated.</p>
            <p>✅ Track your progress.</p>
          </section>

          <section className='container-quote'>
            <p className='quote'>{quote}</p>
            <h4 className='author'>- {author}</h4>
          </section>
        </section>

        <section className='mid-section'>
          <h1 className='app-header'>{day} {date.getDate()}</h1>
          <p className='app-secondary-header'>Today's schedule</p>

          {/* {alert.show && <Alert {...alert} setAlert={setAlert} list={list} />} */}
          <form className='form-group' onSubmit={submitData}>
            <div className='form-control'>
              <input type='text' className='text-input' placeholder='What is your daily tasks?'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <button type='submit' className='submit-btn'>
                {checkEditItem ? 'Edit Task' : 'Add Task'}
              </button>
            </div>
          </form>

          <section className='list-container'>
            {list.map((data, index) => (
              <ListRender key={index} {...data} removeItem={removeItem} editItem={editItem} />
            ))}
          </section>
        </section>

        <section className='right-section'>
          <section className='container-time'>
            <h2>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
            <p>Live time</p>
          </section>

          <div className='container-remain'>
            <h2>Inspiration Quote</h2>
          </div>

          <section className='container-quote'>
            <p className='quote'>{quote}</p>
            <h4 className='author'>- {author}</h4>
          </section>
        </section>
      </div>
    </>
  );
}

export default App;
