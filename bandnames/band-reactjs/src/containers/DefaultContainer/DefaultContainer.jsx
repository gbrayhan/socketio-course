import React from 'react';
import PropTypes from 'prop-types';
import './DefaultContainer.scss';

DefaultContainer.propTypes = {
    children: PropTypes.node,
};

function DefaultContainer(props) {
    return (
        <div className={}>
            {props.children}
        </div>
    );
}

export default DefaultContainer;