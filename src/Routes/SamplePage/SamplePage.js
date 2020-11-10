import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, CardBody } from '@patternfly/react-core';
import { Section, Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import './sample-page.scss';
import { } from '@patternfly/react-core';

const INVENTRY_API_ROOT = '/api/inventory/v1';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */

class SamplePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { systems: [] };
        this.getSystemsForRos = this.getSystemsForRos.bind(this);
    }

    getSystemsForRos() {
        fetch(INVENTRY_API_ROOT.concat('/hosts'))
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

    renderRow(systems) {
        if (systems === undefined) {
            return [];
        }

        return (
            systems.map(({ id, display_name: displayName, fqdn, reporter }, index) => (
                <tr key={index}>
                    <td>{ id }</td>
                    <td>{ displayName }</td>
                    <td>{ fqdn }</td>
                    <td>70</td>
                    <td>{ reporter }</td>
                </tr>
            ))
        );
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
                        <Section type='button-group'>
                            <Button variant='primary' onClick={this.getSystemsForRos} style={ { left: 25, top: 7 } }> Get Systems </Button>
                        </Section>

                        <CardBody>
                            <div>
                                <table className="pf-c-table pf-m-compact">
                                    <thead>
                                        <tr>
                                            <th>System ID</th>
                                            <th>System Name</th>
                                            <th>FQDN</th>
                                            <th>CPU Score</th>
                                            <th>Tags</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.renderRow(systems) }
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </Main>
            </React.Fragment>
        );
    }
}

export default withRouter(SamplePage);
