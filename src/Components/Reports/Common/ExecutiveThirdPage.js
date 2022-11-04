import React, { Fragment } from 'react';
import { Text } from '@react-pdf/renderer';
import styles from './styles';
import { DescriptionList } from './DescriptionList';
import { conditionsDescription, sysStatesDescription } from '../Constants';

export const ExecutiveThirdPage = () => {

    return <Fragment key="second-page">
        <Text style={styles.execHeading}>Description of states</Text>
        {
            sysStatesDescription.map(
                (state, index) => <DescriptionList
                    key={`${index}-${state.title}`}
                    id={state.title}
                    title={state.title}
                    description={state.description}
                    iconPath={state.iconPath}
                    iconScale={state.iconScale}
                    fillColor={state.fillColor} />)
        }

        <Text style={styles.execHeading}>Description of conditions</Text>
        {
            conditionsDescription.map(
                (condition, index) => <DescriptionList
                    key={`${index}-${condition.title}`}
                    id={condition.title}
                    title={condition.title}
                    description={condition.description}/>)
        }
    </Fragment>;
};

