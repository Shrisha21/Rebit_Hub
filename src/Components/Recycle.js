import React, { Component} from 'react'
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from 'react-bootstrap/Modal'
import RestoreIcon from '@material-ui/icons/Restore';
import DeleteIcon from '@material-ui/icons/Delete';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Alert from 'react-bootstrap/Alert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const email = cookies.get('email')
export default class Recycle extends Component {
    constructor(props){
        super(props)
        this.state = {
            files : '',
            openModal : true
        }
    }
    componentDidMount () {
        this.getDeletedFiles()
    }
    componentDidUpdate () {
        this.getDeletedFiles()
    }
   
    getDeletedFiles = () => {
        fetch("http://localhost:8080/api/bin",{
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
    restoreFile = (filename) => {
        fetch("http://localhost:8080/api/binRestore",{
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
        this.getDeletedFiles()
    }
    
    deleteFromBin = (filename) => {
        fetch("http://localhost:8080/api/binDelete",{
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
        this.getDeletedFiles()
    }

    render() {
        const {files} = this.state
        return (
            <div style={{ marginTop: '90px' }}>
                <Row className='row'>

                    <Col sm={6}>
                        <div style={{
                            fontSize: '58px', color: 'yellowgreen',
                            fontWeight: 'bolder', marginLeft: '20px'
                        }}>
                            Worried about deleted files? Here it is!
                         </div>

                    </Col>

                    <Col>
                    {
                            files && <div align='center'>
                                <div style={{fontWeight:"bolder",marginBottom:'10px'}}>DELETED FILES</div>
                                <table className="tb1"> 
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Size in (MB)</th>
                                            <th>Date Uploaded</th>
                                            <th>Restore</th>
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
                                                        <td align='center'><RestoreIcon align='center' style={{color:'green',cursor:'pointer',}} 
                                                        onClick={()=>this.restoreFile(file.file_name)} /></td>
                                                        <td align='center'><DeleteIcon align='center' style={{color:'red',cursor:'pointer',}}
                                                        onClick={()=>this.deleteFromBin(file.file_name)} /></td>
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
                                No deleted file(s) found!!
                            </div>
                        }
                        {  this.state.openModal &&
                        <>
                            <Modal backdrop="static" show={this.state.openModal}
                            keyboard={false}>
                            <Modal.Dialog>
                            <Modal.Header style={{backgroundColor:'yellowgreen',opacity:'0.8'}}>
                              <Modal.Title>Delete file</Modal.Title>
                            </Modal.Header>
                          
                            <Modal.Body>
                              <p style={{color:'orange',fontWeight:'bolder'}}>Warning: The deleted files cannot be restored!</p>
                            </Modal.Body>
                          
                            <Modal.Footer>
                              <Button variant="secondary" onClick={()=>{this.setState({openModal:false})}} style={{border: 'aliceblue',marginRight:'15px'}}
                               > Cancel</Button>
                              <Button style={{backgroundColor:'orange',border: 'aliceblue'}}>Delete</Button>
                            </Modal.Footer>
                          </Modal.Dialog>
                          </Modal>
                          </>
                        }
                    </Col>

                </Row>
            </div>
        )
    }
}
