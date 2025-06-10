import { FC, Fragment, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Pageheader from '../../../../components/pageheader/pageheader';
import Select from "react-select";
// import { Creatable } from 'react-select';
import { MultiSelect } from 'react-multi-select-component';
import Editordata, { multiselectdata } from './createdata';
import DatePicker from 'react-datepicker';
//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);
import CreatableSelect from 'react-select/creatable';


const Createproject = () => {
    //
    const components = {
        DropdownIndicator: null,
      };
    
      const createOption = (label) => ({
        label,
        value: label,
      });
    
      const [inputValue, setInputValue] = useState('');
      const [value, setValue] = useState([
        createOption("Marketing"),
        createOption(" Sales"),
        createOption(" Development"),
        createOption(" Design"),
        createOption(" Research")
      ]);
      const handleKeyDown = (event) => {
        if (!inputValue) return;
        switch (event.key) {
          case 'Enter':
          case 'Tab':
            setValue((prev) => [...prev, createOption(inputValue)]);
            setInputValue('');
            event.preventDefault();
        }
      };



    //
    const [files, setFiles] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());

    const handleDateChange = (date) => {
        // Ensure date is defined before setting it
        if (date) {
            setStartDate(date);
        }
    };
    const handleDateChange1 = (date1) => {
        // Ensure date is defined before setting it
        if (date1) {
            setStartDate1(date1);
        }
    };
    // const [value1, setValue1] = useState('');
    const [selected1, setSelected1] = useState([]);
    const [selected2, setSelected2] = useState([]);
    const Data = [
        { value: 1, label: 'High' },
        { value: 2, label: 'Low' },
        { value: 3, label: 'Medium' },
    ];
    const Data1 = [
        { value: 1, label: 'Inprogress' },
        { value: 2, label: 'On hold' },
        { value: 3, label: 'completed' },
    ];

    return (
        <Fragment>
            <Pageheader title="Create Project" heading="Projects" active="Create Project" />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>
                                Create Project
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="row gy-3">
                                <Col xl={4}>
                                    <Form.Label htmlFor="input-label" className="form-label">Project Name :</Form.Label>
                                    <Form.Control type="text" className="form-control" id="input-label" placeholder="Enter Project Name" />
                                </Col>
                                <Col xl={4}>
                                    <Form.Label htmlFor="input-label11" className="form-label">Project Manager :</Form.Label>
                                    <Form.Control type="text" className="form-control" id="input-label11" placeholder="Project Manager Name" />
                                </Col>
                                <Col xl={4}>
                                    <Form.Label htmlFor="input-label1" className="form-label">Client / Stakeholder :</Form.Label>
                                    <Form.Control type="text" className="form-control" id="input-label1" placeholder="Enter Client Name" />
                                </Col>
                                <Col xl={12}>
                                    <Form.Label className="form-label">Project Description :</Form.Label>
                                  
                                    <Editordata placeholder={'Write something...'} />
                                </Col>
                                <Col xl={6}>
                                    <Form.Label className="form-label">Start Date :</Form.Label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-text text-muted"> <i className="ri-calendar-line"></i> </div>
                                           
                                            <DatePicker
                                             selected={startDate}
                                                // placeholderText='Choose date and time'
                                                onChange={handleDateChange}
                                                timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <Form.Label className="form-label">End Date :</Form.Label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-text text-muted"> <i className="ri-calendar-line"></i> </div>
                                         
                                             <DatePicker
                                             selected={startDate1}
                                                placeholderText='Choose date and time'
                                                onChange={handleDateChange1}
                                                timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <Form.Label className="form-label">Status :</Form.Label>
                                    <MultiSelect options={Data1} value={selected2} onChange={setSelected2} labelledBy="1" />
                                </Col>
                                <Col xl={6}>
                                    <Form.Label className="form-label">Priority :</Form.Label>
                                    <MultiSelect options={Data} value={selected1} onChange={setSelected1} labelledBy="1" />
                                </Col>
                                <Col xl={6}>
                                    <Form.Label className="form-label">Assigned To</Form.Label>

                                    <Select isMulti name="colors" options={multiselectdata} className="basic-multi-select" classNamePrefix="Select2"
                                        defaultValue={[multiselectdata[0], multiselectdata[9], multiselectdata[4]]} />
                                </Col>
                                <Col xl={6} className='passing-option'>
                                    <Form.Label className="form-label">Tags</Form.Label>
                                       <CreatableSelect
                                                components={components}
                                                classNamePrefix='react-select'
                                                inputValue={inputValue}
                                                isClearable
                                                isMulti
                                                menuIsOpen={false}
                                                onChange={(newValue) => {
                                                    // Ensure newValue is an array (or empty array) of objects
                                                    if (Array.isArray(newValue)) {
                                                    setValue(newValue);
                                                    } else {
                                                    // Handle the case when newValue is not an array
                                                    setValue([]);
                                                    }
                                                }}
                                                onInputChange={(newValue) => setInputValue(newValue)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Type something and press enter..."
                                                value={value}
                                                />
                                </Col>
                                <Col xl={12}>
                                    <Form.Label className="form-label">Attachments</Form.Label>
                                    <FilePond className="multiple-filepond"
                                                            files={files}
                                                            onupdatefiles={setFiles}
                                                            allowMultiple={true}
                                                            maxFiles={6}
                                                            server="/api"
                                                            name="files" /* sets the file input name, it's filepond by default */
                                                            labelIdle='Drag & Drop your file here or click '
                                                        />
                                </Col>
                            </div>
                        </Card.Body>
                        <Card.Footer className="card-footer">
                            <Button variant="" className="btn btn-primary-light btn-wave ms-auto float-end">Create Project</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Createproject;
