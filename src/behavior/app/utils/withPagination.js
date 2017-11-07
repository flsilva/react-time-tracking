import React, { Component } from 'react';

const withPagination = getNextPageQuery => WrappedComponent => (
  class extends Component {
    state = { currentPage: 0, queries: {} };

    getQueriesAsArray = () => (
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

    render() {
      return (
        <WrappedComponent
          getNextPageQuery={this.getNextPageQuery}
          queries={this.getQueriesAsArray()}
          {...this.props}
        />
      );
    }
  }
);

export default withPagination;
