import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// when press @ at the end
// when press @ at the start
// when press @ in the middle

// when start editing red span
// when press delete in red span
// when press "a" in red span

// when delete all info from text
// если начал редактировать уже контакт и нажал @

// если начал вводить @ но ничего не выбрал  ?
// Если несколько одинаковых контактов в списке

// Курсор почему-то скачет ? если менять значение контакта
// записать все в стор Участников

// Управлять кнопками вниз


// Issues:
// If I removed Name manualy
