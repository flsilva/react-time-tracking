import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const bodyStyles = {
  margin: '20px',
};

class TimeLogForm extends Component {

  state = {
    description: (this.props.timeLog && this.props.timeLog.description) ? this.props.timeLog.description : '',
  }

  componentWillReceiveProps = (nextProps) => {
    // console.log('TimeLogForm().componentWillReceiveProps() - nextProps: ', nextProps);

    if (!nextProps.timeLog) return;

    this.setState({
      description: nextProps.timeLog.description,
    });
  }

  changeHandler = (e) => {
    this.setState({ description: e.target.value });
  }

  saveHandler = () => {
    const data = {
      name: this.state.name,
    };

    this.props.submitHandler(data);
  }

  render() {
    const timeBgColor = this.context.muiTheme.palette.primary1Color;

    return (
      <div>
        <div style={{ backgroundColor: timeBgColor, height: '130px' }}></div>
        <div style={bodyStyles}>
          <TextField
            hintText="Description"
            onChange={this.changeHandler}
            type="text"
            value={this.state.description}
          />
          {this.props.timeLog && this.props.timeLog.author &&
            <p>Author: {this.props.timeLog.author.email}</p>
          }
        </div>
      </div>
    );
  }
}

TimeLogForm.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

TimeLogForm.propTypes = {
  timeLog: PropTypes.shape({
    description: PropTypes.string,
    author: PropTypes.shape({
      email: PropTypes.string,
    }),
  }),
  submitHandler: PropTypes.func.isRequired,
};

TimeLogForm.defaultProps = {
  timeLog: null,
};

export default TimeLogForm;
