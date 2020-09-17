import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import RestoreIcon from '@material-ui/icons/Restore';
import DeleteIcon from '@material-ui/icons/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
import Tooltip from '@material-ui/core/Tooltip';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Alert from 'react-bootstrap/Alert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const email = cookies.get('email')
export default class Restore extends Component {
    constructor(props){
        super(props);
        this.state = {
            files : '',
            msg : ''
        }
    }
    componentDidMount () {
        this.getFiles()
    }

    componentDidUpdate () {
        this.getFiles()
    }
    
    getFiles = () => {
        fetch("http://localhost:8080/api/recover",{
            "method" : "POST",
            "body" : JSON.stringify({
                email : email
            })
        }).then(res => res.json()).then(
             res => {
                 this.setState({
                    files : res
                })                
            }
        ).catch(err => {
            console.log(err)
        })
    }
    onDelete = (filename) => {
        fetch("http://localhost:8080/api/delete",{
            "method" : "POST",
            "body" : JSON.stringify({
                file : filename,
                email : email
            })
        }).then(res=>res.json()).then(
                res => {
                    console.log(res)
                    this.setState({
                        msg : res
                    })
                }
            ).catch(err => {
            console.log(err)
        })
        
    }
    render() {
        let {files} = this.state
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
                    <Col>
                        {
                            files && <div align='center'>
                                <div style={{fontWeight:"bolder",marginBottom:'10px'}}>BACKUP FILES</div>
                                <table className="tb1"> 
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Size in (MB)</th>
                                            <th>Date Uploaded</th>
                                            <th>Recover</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            files.map((file,index) => {
                                                return(
                                                    <tr key={index}>
                                                        <Tooltip title={file.file_name} placement="left">
                                                        <td align='center'>{(file.file_name).substring(0,15)}..</td></Tooltip>
                                                        <td align='center'>{(file.size/1000000).toFixed(1)}</td>
                                                        <td align='center'>{file.uploadedOn}</td>
                                                        <td align='center'><RestoreIcon align='center' style={{color:'green',cursor:'pointer',}} /></td>
                                                        <td align='center'><DeleteIcon align='center' style={{color:'red',cursor:'pointer',}}
                                                        onClick={()=>this.onDelete(file.file_name)} /></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                        {
                            !files && <div align='center' style={{color:'orange',fontWeight:'bolder',marginTop:'20px'}}>
                                No file(s) found!!
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}
