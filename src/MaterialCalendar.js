'use strict';

import React, { Component } from 'react';
import ReactNative, {
    requireNativeComponent,
    View,
    UIManager
} from 'react-native';
import PropTypes from 'prop-types';

const NativeCalendar = requireNativeComponent('RNMaterialCalendar', Calendar);

const FIRST_DAY_OF_WEEK = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
];

const SHOWING_DATE = [
    'all',
    'current'
];

const SELECTION_MODES = [
    'none',
    'single',
    'multiple'
];

var MATERIAL_CALENDAR_REF = 'calendar';

class Calendar extends Component {
    getInnerViewNode = (): ReactComponent => {
        return this.refs[MATERIAL_CALENDAR_REF].getInnerViewNode();
    };

    _onDateSelect = (event) => {
        this.props.onDateSelect && this.props.onDateSelect(event.nativeEvent);
    };

    _onMonthChange = (event) => {
        this.props.onMonthChange && this.props.onMonthChange(event.nativeEvent);
    };

    goToPrevious = () => {
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this),
            UIManager.RNMaterialCalendar.Commands.goToPrevious,
            []
        );
    };

    goToNext = () => {
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this),
            UIManager.RNMaterialCalendar.Commands.goToNext,
            []
        );
    };

    setCurrentDate = (date) => {
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this),
            UIManager.RNMaterialCalendar.Commands.setCurrentDate,
            [[date.getFullYear(), date.getMonth(), date.getDate()]]
        );
    };

    render() {
        var { style, eventsDates, ...rest } = this.props,
            width = rest.width,
            height = rest.topbarVisible ? width / 7 * 8 : width,
            decoratedEventsDates = eventsDates.map((date, index) => ([date.getFullYear(), date.getMonth(), date.getDate()]));

        style = {
            ...style,
            width,
            height
        };

        return (
            <NativeCalendar
                {...rest}
                ref={MATERIAL_CALENDAR_REF}
                style={style}
                eventsDates={decoratedEventsDates}
                onDateSelect={this._onDateSelect}
                onMonthChange={this._onMonthChange}/>
        );
    }
}

Calendar.propTypes = {
    ...View.propTypes,
    width: PropTypes.number.isRequired,
    topbarVisible: PropTypes.bool,
    arrowColor: PropTypes.string,
    firstDayOfWeek: PropTypes.oneOf(FIRST_DAY_OF_WEEK),
    showDate: PropTypes.oneOf(SHOWING_DATE),
    currentDate: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])),
    selectionMode: PropTypes.oneOf(SELECTION_MODES),
    selectionColor: PropTypes.string,
    selectedDates: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])),

    onDateSelect: PropTypes.func,
    onMonthChange: PropTypes.func,
    initDecorator: PropTypes.bool,
    weekDayFormatter: PropTypes.arrayOf(PropTypes.string),
    eventsDates: PropTypes.arrayOf(PropTypes.instanceOf(Date))
};

Calendar.defaultProps = {
    topbarVisible: true,
    eventsDates: []
};

export default Calendar;
