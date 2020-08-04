import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UrlContainer from './UrlContainer';
import { MemoryRouter } from 'react-router-dom';

describe('UrlContainer',() => {
  let apiDelete = jest.fn()
  let arrayOfUrls;
  beforeEach(() => {
    arrayOfUrls = [
      {
        id: 1,
        long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        short_url: 'http://localhost:3001/useshorturl/1',
        title: 'Awesome photo'
      }
    ]
  })
  it("When passed array of urls, do headings and a tags get rendered properly", () => {
    const {getByText} = render(
      <UrlContainer 
        urls={arrayOfUrls}
        apiDelete={apiDelete}
      />
    );
    const title = getByText('Awesome photo');
    const shortUrl = getByText('http://localhost:3001/useshorturl/1');

    expect(title).toBeInTheDocument();
    expect(shortUrl).toBeInTheDocument();
  })
})
