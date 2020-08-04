import React from 'react';
import App from './App'
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getByPlaceholderText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getAllUrls, postUrl, deleteUrl } from '../../apiCalls';
jest.mock('../../apiCalls');
//make sure any UI specific to the App component renders as well
//make sure that any urls on the server are added to the dom
//make sure that users can fill out the form, submit the form, and see a new url added to the DOM

describe("App", () => {
  let mockGetAllUrls;
  let mockPostUrl;
  let mockDeleteUrl;
  beforeEach(() => {
    mockGetAllUrls = [
      { 
        id: 1,
        long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        short_url: 'http://localhost:3001/useshorturl/1',
        title: 'Awesome photo'
      }
    ];
    mockPostUrl = {
      "long_url": "https://www.google.com/search?tbm=isch&sxsrf=ALeKk034TCa2ipHQoj_SHev7b2z6Xm6YUw%3A1596556466428&source=hp&biw=720&bih=701&ei=soQpX_HFF7iD9PwPpI6AmAY&q=fortune+cookie+icon&oq=&gs_lcp=CgNpbWcQARgEMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnUABYAGDWGmgBcAB4AIABAIgBAJIBAJgBAKoBC2d3cy13aXotaW1nsAEK&sclient=img#imgrc=6dhIOlfI92IASM",
      "title": "Test",
      "id": 2,
      "short_url": "http://localhost:3001/useshorturl/2"
    }
  });

  it("should render form on load", () => {
    getAllUrls.mockResolvedValue(mockGetAllUrls);
    postUrl.mockResolvedValue(mockPostUrl);
    const {  getByRole, getAllByText, getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const button =  getByRole('button');
    expect(button).toBeInTheDocument();

    const titleInput = getByPlaceholderText("Title", {exact: false});
    expect(titleInput).toBeInTheDocument();

    const urlInput = getByPlaceholderText('URL', {exact: false});
    expect(urlInput).toBeInTheDocument();
  });

  it("should render container on load", async () => {
    getAllUrls.mockResolvedValue(mockGetAllUrls);
    postUrl.mockResolvedValue(mockPostUrl);
    const {  getByRole, getAllByText, getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    waitFor(() => {
      const title = getByText('Awesome photo');
      const shortUrl = getByText('http://localhost:3001/useshorturl/1');
  
      expect(title).toBeInTheDocument();
      expect(shortUrl).toBeInTheDocument();
    })
  });
  it("should render message if no urls on load", () => {
    const {  getByRole, getAllByText, getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
      const blankMessage = getByText('No urls yet! Find some to shorten!');
      expect(blankMessage).toBeInTheDocument();
  });

  it('should fill out form then see new one on page', () => {
    getAllUrls.mockResolvedValue(mockGetAllUrls);
    postUrl.mockResolvedValue(mockPostUrl);
    const {  getByRole, getAllByText, getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const button =  getByRole('button');
    const titleInput = getByPlaceholderText("Title", {exact: false});
    const urlInput = getByPlaceholderText('URL', {exact: false});

    expect(postUrl).not.toHaveBeenCalled();


    fireEvent.change(titleInput, { target: { value: "Test" } });
    fireEvent.change(urlInput, { target: { value: "https://www.google.com/search?tbm=isch&sxsrf=ALeKk034TCa2ipHQoj_SHev7b2z6Xm6YUw%3A1596556466428&source=hp&biw=720&bih=701&ei=soQpX_HFF7iD9PwPpI6AmAY&q=fortune+cookie+icon&oq=&gs_lcp=CgNpbWcQARgEMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnUABYAGDWGmgBcAB4AIABAIgBAJIBAJgBAKoBC2d3cy13aXotaW1nsAEK&sclient=img#imgrc=6dhIOlfI92IASM" } });
    fireEvent.click(button);

    expect(postUrl).toHaveBeenCalled();

    waitFor(() => {
      const testTitle = getByText('Test', { exact: false});
      expect(testTitle).toBeInTheDocument()
    })

    // {
    //   "long_url": "https://www.google.com/search?tbm=isch&sxsrf=ALeKk034TCa2ipHQoj_SHev7b2z6Xm6YUw%3A1596556466428&source=hp&biw=720&bih=701&ei=soQpX_HFF7iD9PwPpI6AmAY&q=fortune+cookie+icon&oq=&gs_lcp=CgNpbWcQARgEMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnUABYAGDWGmgBcAB4AIABAIgBAJIBAJgBAKoBC2d3cy13aXotaW1nsAEK&sclient=img#imgrc=6dhIOlfI92IASM",
    //   "title": "Test",
    //   "id": 2,
    //   "short_url": "http://localhost:3001/useshorturl/2"
    // }


  })

})