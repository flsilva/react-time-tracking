import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import map from 'lodash/fp/map';
import pipe from 'lodash/fp/pipe';
import sortBy from 'lodash/fp/sortBy';

export default (WrappedComponent) => {
  class WithPagination extends Component {
    state = { currentPage: 0, queries: {} };

    getQueriesAsArray = queries => toPageObj => (
      pipe([
        keys,
        map(toPageObj(queries)),
        sortBy('page'),
      ])(queries)
    )

    getNextPageQuery = () => this.getPageQuery(this.state.currentPage + 1);

    getPageQuery = (page) => {
      if (isNaN(page) || page < 1) {
        throw new Error(`Argument <page> must be a positive integer. Received: ${page}`);
      }

      const query = this.props.getQuery(page);

      this.setState(prevState => ({
        currentPage: page,
        queries: {
          ...prevState.queries,
          ...{
            [page.toString()]: query,
          },
        },
      }));

      return query;
    }

    getPreviousPageQuery = () => this.getPageQuery(this.state.currentPage - 1);

    toPageObj = data => key => ({
      page: parseInt(key, 10),
      query: data[key],
    })

    render() {
      const queriesArray = this.getQueriesAsArray(this.state.queries)(this.toPageObj);

      return (
        <WrappedComponent
          {...this.props}
          currentPage={this.state.currentPage}
          getNextPageQuery={this.getNextPageQuery}
          getPageQuery={this.getPageQuery}
          getPreviousPageQuery={this.getPreviousPageQuery}
          queries={queriesArray}
        />
      );
    }
  }

  WithPagination.propTypes = {
    getQuery: PropTypes.func.isRequired,
  };

  return WithPagination;
};
