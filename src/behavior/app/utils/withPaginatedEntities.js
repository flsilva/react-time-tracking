import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import flatten from 'lodash/flatten';
import last from 'lodash/last';
import pipe from 'lodash/fp/pipe';

export default ({ autoLoad, getEntities, getError, getIsConnecting, readEntities }) => (
  (WrappedComponent) => {
    class WithPaginatedEntities extends Component {
      componentDidMount() {
        if (autoLoad) this.readNextPage();
      }

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

    const getEntitiesFromResults = results => (
      results && results.length ?
        flatten(
          results.map(result => (
            result ? result.entities : undefined
          )),
        ) : undefined
    );

    const getResults = (state, queries) => (
      queries && queries.length ?
        queries.map(paginatedQuery => getEntities(state, paginatedQuery.query))
          .filter(result => result)
        : undefined
    );

    const getTotalEntities = result => (result ? result.meta['total-records'] : undefined);

    const getTotalPages = result => (result ? result.meta['total-pages'] : undefined);

    const hasNextPage = (currentPage, totalPages) => (
      totalPages && totalPages > currentPage
    );

    const mapStateToProps = (state, { currentPage, queries }) => (
      pipe(
        props => ({ ...props, results: getResults(state, queries) }),
        props => ({ ...props, entities: getEntitiesFromResults(props.results) }),
        props => ({ ...props, totalEntities: getTotalEntities(last(props.results)) }),
        props => ({ ...props, totalPages: getTotalPages(last(props.results)) }),
        props => ({ ...props, hasNextPage: hasNextPage(currentPage, props.totalPages) }),
      )({
        error: getError(state),
        isConnecting: getIsConnecting(state),
      })
    );

    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators({ readEntities }, dispatch),
    });

    return connect(
      mapStateToProps,
      mapDispatchToProps,
    )(WithPaginatedEntities);
  }
);
