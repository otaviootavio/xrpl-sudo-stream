import React from 'react';
import { Concept } from './sections/Concept';
import { Features } from './sections/Features';
import { UseCases } from './sections/UseCases';
import { Quote } from './sections/Quote';

export const Main: React.FC = () => {
  return (
    <main>
      <Concept />
      <Features />
      <UseCases />
      <Quote />
    </main>
  );
}