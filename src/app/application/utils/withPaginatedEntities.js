import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import flatten from 'lodash/flatten';
import last from 'lodash/last';
import pipe from 'lodash/fp/pipe';

export default ({
  autoLoad,
  getCollection,
  getError,
  getIsConnecting,
  readCollection,
}) => (
  (WrappedComponent) => {
    class WithPaginatedEntities extends Component {
      componentDidMount() {
        if (autoLoad) this.readNextPage();
      }

      readNextPage = () => this.readCollection(this.props.getNextPageQuery());

      readPage = page => this.readCollection(this.props.getPageQuery(page));

      readPreviousPage = () => this.readCollection(this.props.getPreviousPageQuery());

      readCollection = query => this.props.readCollection(query);

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
      readCollection: PropTypes.func.isRequired,
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
        queries.map(paginatedQuery => getCollection(state, paginatedQuery.query))
          .filter(result => result)
        : undefined
    );

    const getTotalEntities = result => (
      result ? result.queryMetaResult.meta['total-records'] : undefined
    );

    const getTotalPages = result => (
      result ? result.queryMetaResult.meta['total-pages'] : undefined
    );

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
      ...bindActionCreators({ readCollection }, dispatch),
    });

    return connect(
      mapStateToProps,
      mapDispatchToProps,
    )(WithPaginatedEntities);
  }
);
