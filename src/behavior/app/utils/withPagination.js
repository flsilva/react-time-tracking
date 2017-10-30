import React, { Component } from 'react';

const withPagination = getNextPageQuery => WrappedComponent => (
  class extends Component {
    state = { currentPage: 0, queries: {} };

    getAllPageQueries = () => (
      Object.keys(this.state.queries).map(key => this.state.queries[key])
    )

    getNextPageQuery = () => {
      const nextPage = this.state.currentPage + 1;
      const query = getNextPageQuery(nextPage);

      this.setState(prevState => ({
        currentPage: nextPage,
        queries: {
          ...prevState.queries,
          ...{
            [nextPage.toString()]: query,
          },
        },
      }));

      return query;
    }

    getQueryByPage = (page) => {
      if (isNaN(page) || page < 1) {
        throw new Error(`Argument <page> must be a positive integer. Got: ${page}`);
      }

      return this.state.queries[page.toString()];
    }

    render() {
      return (
        <WrappedComponent
          getNextPageQuery={this.getNextPageQuery}
          queries={this.state.queries}
        />
      );
    }
  }
);

export default withPagination;
