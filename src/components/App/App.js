import React, { Component } from 'react';
import './App.css';
import { getAllUrls, postUrl, deleteUrl  } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }
  getUrl = () => {
    getAllUrls();
  }


  sendFormPost = async (url, title) => {
    const apiPostMessage = await postUrl(url, title);
    this.setState( {urls: [...[apiPostMessage], ...this.state.urls]})
  }
  
  // apiDelete = async (id) => {
    
  //   const response = await deleteUrl(id);
  //   return response;
  // }

  componentDidMount = async () => {
    const urls = await getAllUrls();
    this.setState({urls: urls});
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm
            getUrl={this.getUrl}
            sendFormPost={this.sendFormPost}
          />
        </header>

        <UrlContainer 
          urls={this.state.urls}
          apiDelete={this.apiDelete}

        />
      </main>
    );
  }
}

export default App;
