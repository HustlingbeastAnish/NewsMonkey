import LoadingBar from "react-top-loading-bar";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import your route components too
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
// import NewsItem from "./components/NewsItem";

export default class App extends Component {
  pageSize = 5;
  apiKey = process.env.REACT_APP_NEWS_API;
  console.log(process.env.REACT_APP_NEWS_API)
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <BrowserRouter>
        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={15}
                category="general"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={15}
                key="business"
                category="business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={15}
                key="entertainment"
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={15}
                key="sports"
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/general"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={15}
                key="general"
                category="general"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={15}
                key="health"
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={15}
                key="science"
                category="science"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={15}
                key="technology"
                category="technology"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

// export default App;
