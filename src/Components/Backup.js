import React, { Component, createRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from 'react-bootstrap/Alert'
export default class Backup extends Component {
    constructor(){
        super();
        this.state={
            backupFiles:[],
            savedFiles:[],
            totalSize:0,
            showAlert:false,
        }
    }
    render() {
        const fileDrop = (acceptedFiles) => {
        if(acceptedFiles.length > 0){
            for(let i=0;i<acceptedFiles.length;i++){
                this.setState({
                    backupFiles:this.state.backupFiles.concat(acceptedFiles[i])
                });
            }
        } 
        console.log(this.state.backupFiles);
        }
        const deleteFile = (file,event) => {
            event.preventDefault();
            let deletedFileArray = this.state.backupFiles.filter(data => data !== file)
            this.setState({
                backupFiles:deletedFileArray
            });
        }
        const backupFiles = () => {
            //api call to backup the files
            Object.assign(this.state.savedFiles,this.state.backupFiles);
            let sum = 0;
            this.state.savedFiles.map((data)=>{
                return(
            sum = sum + data.size
            )});
            console.log(sum)
            this.setState({
                totalSize:sum,
                showAlert:true,
                backupFiles:[],
            })
        }
        const files = this.state.backupFiles.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
        const dropzoneRef = createRef();
        const openDialog = () => {
            // Note that the ref is set async,
            // so it might be null at some point 
            if (dropzoneRef.current) {
                dropzoneRef.current.open()
            }
        };
        return (
            <div style={{ marginTop: '90px' }}>
                <Row className='row'>

                    <Col sm={6}>
                        <div style={{
                            fontSize: '60px', color: 'yellowgreen',
                            fontWeight: 'bolder',marginLeft:'10px'
                        }}>
                            Wanna secure the data with best data backup?
                        </div>
                        <div style={{ color: 'yellowgreen' }} align='center'>
                            Upload the files using Dropzone!
                        </div>
                    </Col>
                    <Col sm={6} align='center' >
                        <Dropzone ref={dropzoneRef} onDrop={fileDrop} noClick noKeyboard>
                            {({ getRootProps, getInputProps}) => {
                                return (
                                    <div className="container">
                                        <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                            <p style={{marginTop:'60px',marginBottom:'1rem'}}>Drag 'n' drop some files here</p>
                                            <Button style={{marginBottom:'4rem',
                                            backgroundColor:'yellowgreen', border: 'aliceblue', width: '19%'}}
                                                type="button"
                                                onClick={openDialog}
                                            >
                                                Choose Files
                                            </Button>
                                        </div>
                                    </div>
                                );
                            }}
                        </Dropzone>
                    </Col>
                </Row>
                {
                    this.state.showAlert && <div align='center'><Alert style={{backgroundColor:'yellowgreen',
                marginTop:'50px',width:'50%',color:'white'}} 
                    onClose={()=>this.setState({showAlert:false})} dismissible>
                        You have successfully Uploaded the files with size {(this.state.totalSize/1000000).toFixed(1)} Mb!
                    </Alert>
                    </div>
                }
                {files.length > 0 && <div align='center'>
                    <div className='Fileschoosen'>
                        File(s) choosen for backup
                    </div>
                <table style={{marginBottom:'20px'}}>
                    <thead>
                        <tr>
                            <th style={{color:'yellowgreen'}}>Name</th>
                            <th style={{color:'yellowgreen'}}>Size</th>
                            <th style={{color:'yellowgreen'}}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                this.state.backupFiles.map((data)=>{
                                return(
                                <tr>    
                                <td align='center'>{data.name}</td>
                                <td align='center'>{(data.size/1000000).toFixed(1)} Mb</td>
                                <td align='center'><DeleteIcon align='center' style={{color:'red',cursor:'pointer',}} 
                                onClick={(event)=>deleteFile(data,event)}/></td>
                                </tr>
                                )})
                            }
                    </tbody>
                </table>
                <Button style={{marginBottom:'4rem',backgroundColor:'yellowgreen', 
                border: 'aliceblue',}} onClick={backupFiles}>
                    Backup Now!
                </Button>
                </div>
                }
                
            </div>
        )
    }
}
