import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UrlForm from './UrlForm';
// import { MemoryRouter } from 'react-router-dom';

describe("UrlForm", () => {
  let sendFormPost;
  beforeEach(() => {
    sendFormPost = jest.fn();
  })
  it("should render a name and url input", () => {
    const {getByPlaceholderText} = render(
      <UrlForm 
        sendFormPost={sendFormPost}
      />
    );
    const title = getByPlaceholderText('Title', {exact: false});
    const urlToShorten = getByPlaceholderText('URL', {exact: false});

    expect(title).toBeInTheDocument();
    expect(urlToShorten).toBeInTheDocument();
  })
  it("should be able to change values base on user input", () => {
    const {getByPlaceholderText} = render(
      <UrlForm 
        sendFormPost={sendFormPost}
      />
    );
    const title = getByPlaceholderText('Title', {exact: false});
    const urlToShorten = getByPlaceholderText('URL', {exact: false});

    fireEvent.change(title, { target: { value: "Whaddup" } });
    expect(title.value).toBe("Whaddup");

    fireEvent.change(urlToShorten, { target: { value: "Whaddup" } });
    expect(urlToShorten.value).toBe("Whaddup");
  })

  it("should reset values after a submit of form", () => {
    sendFormPost.mockResolvedValue();
    const {getByPlaceholderText, getByRole} = render(
      <UrlForm 
        sendFormPost={sendFormPost}
      />
    );
    const title = getByPlaceholderText('Title', {exact: false});
    const urlToShorten = getByPlaceholderText('URL', {exact: false});
    const button = getByRole('button');

    fireEvent.change(title, { target: { value: "Whaddup" } });
    fireEvent.change(urlToShorten, { target: { value: "Whaddup" } });
    fireEvent.click(button);

    waitFor(()=> {
      expect(title.value).toBe("");
      expect(urlToShorten.value).toBe("");
    });
  });

  it("should call function that post to api 1 time after submit", () => {
    sendFormPost.mockResolvedValue();
    const {getByPlaceholderText, getByRole} = render(
      <UrlForm 
        sendFormPost={sendFormPost}
      />
    );
    const title = getByPlaceholderText('Title', {exact: false});
    const urlToShorten = getByPlaceholderText('URL', {exact: false});
    const button = getByRole('button');

    expect(sendFormPost).not.toHaveBeenCalled();

    fireEvent.change(title, { target: { value: "Whaddup" } });
    fireEvent.change(urlToShorten, { target: { value: "Whaddup" } });
    fireEvent.click(button);

    expect(sendFormPost).toHaveBeenCalled();
  })
})