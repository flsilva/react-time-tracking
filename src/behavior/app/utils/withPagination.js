import React, { Component } from 'react';

const buildQuery = (page, itemsPerPage) => (
  `?page[number]=${page}&page[size]=${itemsPerPage}&sort=-created-at`
);

const withPagination = WrappedComponent => (
  class extends Component {
    state = { currentPage: 0, itemsPerPage: 3, queries: [] };

    nextPage = () => {
      const nextPage = this.state.currentPage + 1;
      const itemsPerPage = this.state.itemsPerPage;
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
