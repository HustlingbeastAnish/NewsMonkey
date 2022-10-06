import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import Spinner from "./Spinner";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("THis is a superconstructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    document.title = `NewsMonkey-${this.capitalizeFirstLetter(
      this.props.category
    )} `;
  }

  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=e0f53bc8b79a4164af82e63df4ce4dfa&page=${this.state.page}&pageSize=6`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parseddata = await data.json();
    this.props.setProgress(0);
    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // console.log(this.state.page);
    // console.log("Hey Cdm");
    // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=e0f53bc8b79a4164af82e63df4ce4dfa&page=${this.state.page}&pageSize=6`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseddata = await data.json();
    // console.log(parseddata);
    // this.setState({
    //   articles: parseddata.articles,
    //   totalResults: parseddata.totalResults,
    //   loading: false,
    // });\
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=e0f53bc8b79a4164af82e63df4ce4dfa&page=${this.state.page}&pageSize=6`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: this.state.articles.concat(parseddata.articles), ///e0f53bc8b79a4164af82e63df4ce4dfa
      totalResults: parseddata.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <>
        <h2
          className="text-center "
          style={{ margin: "30px 0px", marginTop: "90px" }}
        >
          NewMonkey - Top HeadLines
        </h2>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={<h2>Loading...</h2>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4">
                    <NewsItem
                      key={element.url}
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
export default News;

//
/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark "
            onClick={this.onClickPrev}
            disabled={this.state.page <= 1}
          >
            &#8249; Previous Page
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.onClickNext}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next Page &#8250;
          </button>
        </div> */
