import React, { useState } from 'react';
import AddCar from './components/AddCar';
import CarsList from './components/CarsList';
import './App.css';

const items = [
  { key: '1', label: 'Araç Listesi', component: <CarsList /> },
  { key: '2', label: 'Araç Ekleme', component: <AddCar /> },
];

const App = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  return (
    <div className="layout">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Tiger Renta Car" className="logo-img" />
          Tiger Renta Car
        </div>
        <nav className="menu">
          {items.map(({ key, label }) => (
            <button
              key={key}
              className={`menu-item ${selectedKey === key ? 'active' : ''}`}
              onClick={() => setSelectedKey(key)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>
      <main className="content">
        <div className="content-container">
          {items.find(item => item.key === selectedKey)?.component}
        </div>
      </main>
      <footer className="footer">
        Tiger Renta Car ©{new Date().getFullYear()} 
      </footer>
    </div>
  );
};

export default App;
