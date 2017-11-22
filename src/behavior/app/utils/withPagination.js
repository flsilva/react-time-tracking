import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (WrappedComponent) => {
  class WithPagination extends Component {
    state = { currentPage: 0, queries: {} };

    getQueriesAsArray = () => (
      Object.keys(this.state.queries).map(key => this.state.queries[key])
    )

    getNextPageQuery = () => {
      const nextPage = this.state.currentPage + 1;
      const query = this.props.getQuery(nextPage);

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
          {...this.props}
          getNextPageQuery={this.getNextPageQuery}
          queries={this.getQueriesAsArray()}
        />
      );
    }
  }

  WithPagination.propTypes = {
    getQuery: PropTypes.func.isRequired,
  };

  return WithPagination;
};
