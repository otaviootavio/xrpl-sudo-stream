// components/Header.tsx

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <a href="/"></a>  
        <ul>
          <li><a href="#concept">Concept</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#use-cases">Use Cases</a></li>
        </ul>
      </nav>
    </header>
  );
}