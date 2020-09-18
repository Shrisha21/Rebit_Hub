import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import RestoreIcon from '@material-ui/icons/Restore';
import DeleteIcon from '@material-ui/icons/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Tooltip from '@material-ui/core/Tooltip';
// import DeleteIcon from '@material-ui/icons/Delete';
import Alert from 'react-bootstrap/Alert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const email = cookies.get('email')
export default class Restore extends Component {
    constructor(props){
        super(props);
        this.state = {
            files : '',
            msg : '',
            openModal:false,
            deleteFile:'',
            openRestore : false
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
    openModalDelete = (filename) => {
        this.setState({
            deleteFile : filename,
            openModal : true
        });
    }

    deleteFile = () =>{
        this.onDelete(this.state.deleteFile)
        this.setState({
            openModal:false,
            deleteFile : ''
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
                                                        <td align='center'><RestoreIcon align='center' style={{color:'green',cursor:'pointer',}} 
                                                        onClick={()=>{this.setState({openRestore:true})}} /></td>
                                                        <td align='center'><DeleteIcon align='center' style={{color:'red',cursor:'pointer',}}
                                                        onClick={()=>this.openModalDelete(file.file_name)} /></td>
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
                        {  this.state.openModal &&
                        <>
                            <Modal backdrop="static" show={this.state.openModal} 
                            keyboard={false}>
                            <Modal.Dialog style={{marginRight:'127px',width:'100.6%',height:'0px',marginLeft:'-1px'}}>
                            <Modal.Header style={{backgroundColor:'yellowgreen',opacity:'0.8'}}>
                        <Modal.Title style={{color:'gray'}}>DELETE <span style={{color:'red'}}>{(this.state.deleteFile).substring(0,15)}..</span> ?</Modal.Title>
                            </Modal.Header>
                          
                            <Modal.Body>
                              <p style={{color:'orange',fontWeight:'bolder'}}>The file will be moved to trash</p>
                            </Modal.Body>
                          
                            <Modal.Footer>
                              <Button  onClick={()=>{this.setState({openModal:false})}} style={{border: 'aliceblue',marginRight:'15px',backgroundColor:'gray',color:'whitesmoke'}}
                               > No</Button>
                              <Button onClick={this.deleteFile} style={{backgroundColor:'orange',border: 'aliceblue'}}  >Yes</Button>
                            </Modal.Footer>
                          </Modal.Dialog>
                          </Modal>
                          </>
                        }
                        {
                        this.state.openRestore && <div align='center'><Alert style={{
                                backgroundColor: 'orange',
                                marginTop: '50px', width: '60%', color: 'white'
                            }}
                                onClose={() => this.setState({ openRestore: false })} dismissible>
                                Still in development stage!!!
                    </Alert>
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}
