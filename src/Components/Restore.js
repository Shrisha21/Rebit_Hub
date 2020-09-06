import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from 'react-bootstrap/Alert';
export default class Restore extends Component {
    render() {
        return (
            <div style={{ marginTop: '90px' }}>
                <Row className='row'>

                    <Col sm={6}>
                        <div style={{
                            fontSize: '58px', color: 'yellowgreen',
                            fontWeight: 'bolder', marginLeft: '20px'
                        }}>
                            Your files are safe with us. Recover anytime!
                         </div>

                    </Col>
                </Row>
            </div>
        )
    }
}
