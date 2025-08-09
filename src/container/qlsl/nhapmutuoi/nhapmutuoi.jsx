import { FC, Fragment, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  Form,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import Pageheader from "../../../components/pageheader/pageheader";

import { Link } from "react-router-dom";
// import { data_DTDT, data_dungTuoi, data_KTCB } from "../DTDT/DTDTdata";

const NhapMuTuoi = () => {
  //collapse1
  const [open1, setOpen1] = useState(false);

  return (
    <Fragment>
      <Pageheader
        title="Nhập mủ tươi công nhân"
        heading="Tables"
        active="Tables"
      />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>Khai báo thông tin</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row gy-4">
                <Col xl={3} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-date" className="fw-bold">
                    Ngày nhập mủ
                  </Form.Label>
                  <Form.Control type="date" id="input-date" />
                </Col>
                <Col xl={3}>
                  <Form.Label htmlFor="input-date" className="fw-bold">
                    Năm DSCN
                  </Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Chọn năm</option>
                    <option value="1">2025</option>
                    <option value="2">2024</option>
                    <option value="3">2023</option>
                    <option value="4">2022</option>
                    <option value="5">2021</option>
                    <option value="6">2020</option>
                  </Form.Select>
                </Col>
                <Col xl={3}>
                  <Form.Label htmlFor="input-date" className="fw-bold">
                    Tổ/nhóm
                  </Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Chọn tổ/nhóm</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </Form.Select>
                </Col>
                <Col xl={3}>
                  <Form.Label htmlFor="input-date" className="fw-bold">
                    Phiên cạo
                  </Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Chọn phiên cạo</option>
                    <option value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                    <option value="4">D</option>
                  </Form.Select>
                </Col>

                <Col xl={3}>
                  <Form.Label htmlFor="input-date" className="fw-bold">
                    Nhịp độ cạo
                  </Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Chọn nhịp độ cạo</option>
                    <option value="1">d3</option>
                    <option value="2">d4</option>
                  </Form.Select>
                </Col>

                <Col xl={3}>
                  <div className="ps-0">
                    <p className="mb-3 px-0 fw-bold">Chuyển HT thu mủ</p>
                    <Form.Check
                      className="ms-2"
                      type="checkbox"
                      defaultValue=""
                      // defaultChecked
                    />
                  </div>
                </Col>

                <Col xl={3}>
                  <div className="ps-0">
                    <p className="mb-3 px-0 fw-bold">Bất thường khác phiên</p>
                    <Form.Check
                      className="ms-2"
                      type="checkbox"
                      defaultValue=""
                      // defaultChecked
                    />
                  </div>
                </Col>

                <Col xl={3} lg={6} md={6} sm={12}>
                  {/* <Form.Label htmlFor="input-button">Type Button</Form.Label> */}
                  <Form.Control
                    type="button"
                    className="form-control btn btn-primary"
                    id="input-button"
                    defaultValue="Submit"
                  />
                </Col>

                {/* <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-placeholder">
                    Form Input With Placeholder
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="input-placeholder"
                    placeholder="Placeholder"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-text">Type Text</Form.Label>
                  <Form.Control
                    type="text"
                    id="input-text"
                    placeholder="Text"
                  />
                </Col>

                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-submit">Type Submit</Form.Label>
                  <Form.Control
                    type="submit"
                    id="input-submit"
                    defaultValue="Submit"
                  />
                </Col>

                <Col xl={4} lg={6} md={6} sm={12}>
                  <Row>
                    <Col xl={4}>
                      <div className="ps-0">
                        <p className="mb-3 px-0 text-muted">Type Radio</p>
                        <Form.Check
                          className="ms-2"
                          type="radio"
                          defaultChecked
                        />
                      </div>
                    </Col>
                  </Row>
                </Col> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CSS tùy chỉnh */}
      <style jsx>{`
        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .table th.text-wrap,
        .table td {
          white-space: normal !important;
          padding: 8px;
          vertical-align: middle;
          text-align: center;
        }
        .table th.col-stt {
          width: 50px;
        }
        .table th.col-nongtruong {
          width: 80px;
        }
        .table th.col-sxkd-01012025,
        .table th.col-mocao-2025,
        .table th.col-sxkd-thanhlytc,
        .table th.col-sxkd-thanhlygdp,
        .table th.col-sxkd-31122025,
        .table th.col-ktcb-01012025,
        .table th.col-ktcb-mocao-2025,
        .table th.col-ktcb-thanhlygdp,
        .table th.col-ktcb-31122025,
        .table th.col-kh-tctm-2025,
        .table th.col-luancanh-2021,
        .table th.col-luancanh-2022,
        .table th.col-luancanh-2023,
        .table th.col-tong-luancanh,
        .table th.col-fsc,
        .table th.col-vg-vn,
        .table th.col-cho-gdp,
        .table th.col-dt-chuyentc,
        .table th.col-thanhly-goivu,
        .table th.col-tong-dt-vuon {
          width: 120px;
        }
        .table tr.table-active {
          font-weight: bold;
          background-color: #f1f1f1;
        }
        /* Tùy chỉnh thanh trượt ngang */
        .table-responsive::-webkit-scrollbar {
          height: 12px; /* Tăng chiều rộng thanh trượt ngang */
        }
        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1; /* Màu nền của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb {
          background: #888; /* Màu của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #555; /* Màu khi hover */
        }
      `}</style>
    </Fragment>
  );
};

export default NhapMuTuoi;
