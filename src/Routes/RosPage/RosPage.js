import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardBody } from '@patternfly/react-core';
import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import './ros-page.scss';
import { } from '@patternfly/react-core';
import { INVENTRY_API_ROOT } from '../../constants';
import asyncComponent from '../../Utilities/asyncComponent';
const RosTable = asyncComponent(() => import('../../Components/RosTable/RosTable'));

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */

class RosPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { systems: [] };
        this.getSystemsForRos = this.getSystemsForRos.bind(this);
    }

    async componentDidMount() {
        await window.insights.chrome.auth.getUser();
        this.getSystemsForRos();
    }

    getSystemsForRos() {
        fetch(INVENTRY_API_ROOT.concat('/systems'))
        .then((res) => {
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res.json();
        })
        .then(
            result => {
                this.setState({
                    systems: result.results
                });
            }
        ).catch((error) => {
            // Handle the error
            console.log(error);
        });
    }

    render() {
        const { systems } = this.state;

        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Resource Optimization'/>
                </PageHeader>
                <Main>
                    <Card className='pf-t-light  pf-m-opaque-100'>
                        <CardBody>
                            <div>
                                <RosTable systems = {systems}/>
                            </div>
                        </CardBody>
                    </Card>
                </Main>
            </React.Fragment>
        );
    }
}

export default withRouter(RosPage);
