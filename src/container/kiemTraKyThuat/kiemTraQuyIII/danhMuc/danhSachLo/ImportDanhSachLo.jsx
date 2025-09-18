import { Fragment, useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Pageheader from '../../../../../components/pageheader/pageheader';
import { useToast } from "../../../../../contexts/ToastContext";
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const ImportDuLieu = () => {
    const [files1, setFiles1] = useState([]);
    const { showToast } = useToast();
    return (
        <Fragment>

            <Pageheader title="Import dữ liệu" heading="Kiểm tra quý III" active="Import Data Lô" />

            <Row>
                <Form noValidate >
                    <Row>
                        <Col xl={12}>

                            <Card className="custom-card">
                                <Card.Header className="card-header justify-content-between">
                                    <Card.Title>
                                        Import data kiểm tra quý III file excel
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <>
                                        <Col xl={12}>
                                            <Row className="mb-3">
                                                <p className="text-muted subtitle fs-12 fw-normal mt-1">Tải file excel data kiểm tra quý III <a className='text-info' href="https://qlkt.donaruco.vn/files/DataKiemTraQuyIII.xlsx">tại đây</a></p>
                                                <FilePond className="multiple-filepond single-fileupload"
                                                    files={files1}
                                                    onupdatefiles={setFiles1}
                                                    allowMultiple={true}
                                                    maxFiles={1}
                                                    server={{
                                                        url: `${import.meta.env.VITE_API_URL}kiem-tra-quy-iii/danh-muc/import-danh-sach-lo`,

                                                        process: {
                                                            onload: (response) => {
                                                                // Xử lý response từ server
                                                                const parsedResponse = JSON.parse(response);
                                                                if (parsedResponse.message) {
                                                                    showToast({
                                                                        title: 'Thông báo',
                                                                        message: parsedResponse.message,
                                                                        variant: 'success'
                                                                    });
                                                                }
                                                                return response;
                                                            },
                                                            onerror: (response) => {
                                                                showToast({
                                                                    title: 'Thông báo',
                                                                    message: 'Lỗi import file',
                                                                    variant: 'error'
                                                                });
                                                            }
                                                        }
                                                    }}
                                                    name="files"
                                                    labelIdle='Drag & Drop your file here or click '
                                                />
                                            </Row>

                                        </Col>
                                    </>

                                </Card.Body>
                            </Card>

                        </Col>

                    </Row>


                </Form>
            </Row>
        </Fragment>
    );
};

export default ImportDuLieu;
