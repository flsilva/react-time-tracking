import React, { Component } from 'react';

const buildQuery = (page, itemsPerPage) => (
  `?page[number]=${page}&page[size]=${itemsPerPage}&sort=-created-at&include=author`
);

const withPagination = WrappedComponent => (
  class extends Component {
    state = { currentPage: 0, queries: [] };

    nextPage = (itemsPerPage) => {
      const nextPage = this.state.currentPage + 1;
      const query = buildQuery(nextPage, itemsPerPage);

      this.setState(prevState => ({
        currentPage: nextPage,
        queries: [...prevState.queries, ...[query]],
      }));

      return query;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getNextPageQuery={this.nextPage}
          queries={this.state.queries}
        />
      );
    }
  }
);

export default withPagination;
