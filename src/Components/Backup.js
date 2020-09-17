import React, { Component, createRef } from 'react'
import { Row, Col} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from 'react-bootstrap/Alert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const email = cookies.get('email')
export default class Backup extends Component {
    constructor(){
        super();
        this.state={
            backupFiles:[],
            savedFiles:[],
            totalSize:0,
            showAlert:false,
            response : ''
        }
    }
    render() {
        const fileDrop = (acceptedFiles) => {
        if(acceptedFiles.length === 1){
                this.setState({
                    backupFiles:acceptedFiles
                });
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
            const formData = new FormData()
            formData.append('file',this.state.savedFiles[0])
            formData.append('email',email)
            fetch("http://localhost:8080/api/upload",{
                "method" : "POST",
                "body" :  formData
                
            }).then(res => res.json()).then(
                res => {
                    this.setState({
                        response : res
                    })               
               }
           ).catch(err => {
               console.log(err)
           })

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
            <div style={{ marginTop: '90px'}}>
                <Row className='row'>

                    <Col sm={6}>
                        <div style={{
                            fontSize: '58px', color: 'yellowgreen',
                            fontWeight: 'bolder',marginLeft:'20px'
                        }}>
                            Why panic about the data loss? Use Rebit!
                        </div>
                        
                    </Col>
                    <Col sm={6} align='center' >
                        <Dropzone enctype="multipart/form-data" ref={dropzoneRef} onDrop={fileDrop} multiple={false} noClick noKeyboard>
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
                        <div style={{ color: '#f9b905' }} align='center'>
                            Use the above dropzone for data backup
                        </div>
                    </Col>
                </Row>
                {
                   this.state.response && this.state.showAlert && <div align='center'><Alert style={{backgroundColor:'yellowgreen',
                marginTop:'50px',width:'50%',color:'white'}} 
                    onClose={()=>this.setState({showAlert:false})} dismissible>
                        Successfull uploaded the {this.state.response.name} and size is ({(this.state.response.size/1000000).toFixed(1)}) MB
                    </Alert>
                    </div>
                }
                {files.length > 0 && <div align='center'>
                    <div className='Fileschoosen'>
                        File choosen for backup
                    </div>
                <table style={{marginBottom:'20px',bottom:'auto'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                this.state.backupFiles.map((data,index)=>{
                                return(
                                <tr key={index}>    
                                <Tooltip title={data.name} placement="left">
                                <td align='center'>{(data.name).substring(0,20)}..</td></Tooltip>
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
