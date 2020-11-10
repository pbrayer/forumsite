import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import Textbox from './components/Textbox';
import Post from './components/Post';
import Commentbox from './components/Commentbox';
import Comments from './components/Comments';
import User from './components/User';
import Postbox from './components/Postbox';
import Login from './components/Login';
import loading from '../src/img/loading.gif';

import './styles/style.css';
import data from './newdata';

class App extends Component {

  state = {
    messages: [],
    initialLoad: false,
    loggedIn: false,
    username: '',
    updated: false,
    nothing: '',
    selectedPost: ''
  };

  showOnePost = (e) => {
    console.log("clicking on it")
    e.preventDefault();
    let id = e.target.id
    console.log(id)

    const map1 = (this.state.messages).filter(message => message._id === id);

    this.setState({messages: map1});
    this.setState({selectedPost: id});

  }

  postToDatabase(post) {
    fetch('./api/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then((res) => {
        // Do something with the response
      })
      .then(this.setState({ updated: false }));
  }

  commentToDatabase(comment) {
    fetch('./api/comment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
      .then((res) => {
        // Do something with the response
      })
      .then(this.setState({ updated: false }));
  }

  login = (e) => {
    e.preventDefault();
    const username = e.target.username.value;

    if (username) {
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ loggedIn: true, username });
            localStorage.setItem('username', username);
          }
        })
        .catch((e) => null);
    }

    console.log('Logging in!');
  };

  logout = () => {
    fetch('/api/logout', {
      method: 'POST'
    }).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem('username');
        this.setState({ username: '', loggedIn: false });
      }
    });
  };

  newPost = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let body = e.target.body.value;
    let pic = e.target.pic.value;

    if (title) {
      let data = {};
      data.title = title;
      data.body = body;
      data.pic = pic;
      data.author = this.state.username || 'User';
      data.posted = Date.now();
      data.votes = 1;

      // messages.push(data);
      // this.setState({ messages });
      this.postToDatabase(data);

      e.target.reset();
    }

    console.log(title);
    console.log(pic);
  };

  newComment = (e) => {
    e.preventDefault();
    let body = e.target.body.value;
    let pic = e.target.pic.value;

      let data = {};
      data.body = body;
      data.pic = pic;
      data.author = this.state.username || 'User';
      data.id = this.state.selectedPost;
      data.posted = Date.now();

      console.log(data)

      // messages.push(data);
      // this.setState({ messages });
      this.commentToDatabase(data);

      e.target.reset();
  };

  vote = (key, index, isUpvote) => {
    let messages = [...this.state.messages];
    let votes = messages[index].votes;
    if (isUpvote) {
      votes++;
    } else {
      votes--;
    }
    let id = key;

    fetch('./api/vote', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, votes })
    })
      .then((res) => this.setState({ messages, updated: false }))
      .catch((err) => {
        if (err) {
          console.log(err.message);
        }
      });
  };

  loadAllPosts = () => {
    fetch('./api/all')
    .then((res) => res.json())
    .then((messages) => {
      console.log(messages)
      this.setState({ messages, updated: true });
    })
    .catch((err) => {
      this.setState({ updated: true });
    });
  }

  darkModeToggle = () => {
  document.body.classList.toggle('dark-theme');
    }

  componentDidUpdate() {
    if (!this.state.updated) {
      fetch('./api/all')
        .then((res) => res.json())
        .then((messages) => {
          console.log(messages)
          this.setState({ messages, updated: true });
        })
        .catch((err) => {
          this.setState({ updated: true });
        });
    }
  }

  componentDidMount() {
    let username = localStorage.getItem('username') || '';

    fetch('./api/all')
      .then((res) => res.json())
      .then((messages) => {
        console.log(messages)
        this.setState({ messages, updated: true, initialLoad: true });
        if (username) {
          this.setState({ username, loggedIn: true });
        }
      });
  }

  render() {
    return (
      <div className="app">
        <Header
          username={this.state.username}
          loggedIn={this.state.loggedIn}
          login={this.login}
          logout={this.logout}
        />
        <div className="container">
          <div className="posts">
            {!this.state.initialLoad ? (
              <div className="center">
                <img src={loading} alt="Loading" width="100px" height="100px" />
              </div>
            ) : (
              this.state.messages.map((post, index) => (
                <Post
                  key={post._id}
                  index={index}
                  post={post}
                  vote={this.vote}
                  showOnePost = {this.showOnePost}
                />
              )
            )
            )}
          </div>
          <div className = "view">
          {this.state.messages.length === 1 ? (
            <button onClick = {this.loadAllPosts}>View All Posts</button>
            ) : 
            <button onClick = {this.darkModeToggle}>Dark Mode</button>
            }
          </div>
          <div className = "posts">
            {(this.state.messages.length === 1) && (this.state.messages[0].comments.length > 0) ? (
              this.state.messages[0].comments.map((comments) => (
                <Comments
                 key= {comments._id}
                 comments = {comments}
                 />
              )
            )) : this.state.messages.length === 1 ? (
              <h1>This Post doesn't have any comments yet! Add one!</h1>
            ) : null
             }
          </div>
          <div className="user">       
            {(this.state.messages.length === 1) && this.state.loggedIn ? (
            (
              <Commentbox newComment={this.newComment} />
            )) : this.state.loggedIn ? ( <Postbox newPost={this.newPost} />
            ) : (
              <div className="guest-msg">
                <p>You can post something after signing up above ⬆️</p>
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <p>
            Forum Site in Node.js & React.js by{' '}
            <a
              href="https://pbrayer.github.io/UpdatedProfile"
              target="_blank">
              Samuel Reimann
            </a>
            &nbsp; | &nbsp;
            <a
              href="https://github.com/pbrayer"
              target="_blank">
              Source code
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
