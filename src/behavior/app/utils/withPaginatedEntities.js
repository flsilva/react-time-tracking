import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import flatten from 'lodash/flatten';

export default ({ getEntities, getError, getIsConnecting, readEntities }) => (
  (WrappedComponent) => {
    class WithPaginatedEntities extends Component {
      state = { paginatedEntities: [] };

      readNextPage = () => this.readEntities(this.props.getNextPageQuery());

      readPage = page => this.readEntities(this.props.getPageQuery(page));

      readPreviousPage = () => this.readEntities(this.props.getPreviousPageQuery());

      readEntities = query => this.props.readEntities(query);

      render() {
        return (
          <WrappedComponent
            {...this.props}
            readNextPage={this.readNextPage}
            readPage={this.readPage}
            readPreviousPage={this.readPreviousPage}
          />
        );
      }
    }

    WithPaginatedEntities.propTypes = {
      currentPage: PropTypes.number,
      error: PropTypes.arrayOf(PropTypes.object),
      getNextPageQuery: PropTypes.func.isRequired,
      getPageQuery: PropTypes.func.isRequired,
      getPreviousPageQuery: PropTypes.func.isRequired,
      hasNextPage: PropTypes.bool,
      isConnecting: PropTypes.bool,
      queries: PropTypes.arrayOf(PropTypes.object),
      readEntities: PropTypes.func.isRequired,
    };

    WithPaginatedEntities.defaultProps = {
      currentPage: undefined,
      error: undefined,
      hasNextPage: false,
      isConnecting: false,
      queries: undefined,
    };

    const getResults = (state, queries) => (
      queries && queries.length ?
        queries.map(paginatedQuery => getEntities(state, paginatedQuery.query))
          .filter(result => result)
        : undefined
    );

    const getEntitiesFromResults = results => (
      results && results.length ?
        flatten(
          results.map(result => (
            result ? result.entities : undefined
          )),
        ) : undefined
    );

    const mapStateToProps = (state, ownProps) => {
      const results = getResults(state, ownProps.queries);
      const entities = getEntitiesFromResults(results);

      const lastResult = results && results.length ?
        results[results.length - 1] : undefined;

      const lastResultMeta = lastResult ? lastResult.meta : undefined;
      const totalEntities = lastResultMeta ? lastResultMeta['total-records'] : 1;
      const totalPages = lastResultMeta ? lastResultMeta['total-pages'] : 1;
      const hasNextPage = totalPages && totalPages > ownProps.currentPage;

      return {
        error: getError(state),
        entities,
        hasNextPage,
        isConnecting: getIsConnecting(state),
        results,
        totalEntities,
        totalPages,
      };
    };

    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators({ readEntities }, dispatch),
    });

    return connect(
      mapStateToProps,
      mapDispatchToProps,
    )(WithPaginatedEntities);
  }
);
