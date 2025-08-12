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
import { danhMucCN } from "../nhapmuchen/data";

const NhapMuChen = () => {
  //collapse1
  const [open1, setOpen1] = useState(false);

  const [danhSachCN, setDanhSachCN] = useState(danhMucCN);

  function loadDanhSachCN() {
    setDanhSachCN(danhMucCN); // Cập nhật state để render lại bảng
  }

  return (
    <Fragment>
      <Pageheader
        title="Nhập mủ chén công nhân"
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
                    onClick={loadDanhSachCN}
                  />
                </Col>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>Thông tin chi tiết</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table text-nowrap" id="bangNhap">
                  <thead className="sticky-header">
                    <tr>
                      <th className="text-wrap bg-light">STT</th>
                      <th className="text-wrap bg-light">STT PC</th>
                      <th className="col-maCN text-center bg-light text-al">
                        Mã CN
                      </th>
                      <th className="col-tenCN text-center bg-light">
                        Tên công nhân
                      </th>
                      <th className="text-wrap bg-light">Mủ HA</th>
                      <th className="text-wrap bg-light">Dầu kích thích</th>
                      <th className="col-HTPC text-wrap bg-light">
                        Hiện trạng PC
                      </th>
                      <th className="text-wrap bg-light">Chén L1</th>
                      <th className="text-wrap bg-light">DRC</th>
                      <th className="text-wrap bg-light">Chén L2</th>
                      <th className="text-wrap bg-light">DRC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {danhSachCN.map((cn) => (
                      <tr key={cn.sttCN}>
                        <td>{cn.sttCN}</td>
                        <td>{cn.sttPC}</td>
                        <td>{cn.maCN}</td>
                        <td>{cn.tenCN}</td>
                        <td>
                          <Form.Check type="checkbox" />
                        </td>
                        <td>
                          <Form.Check type="checkbox" />
                        </td>
                        <td>
                          <Form.Select aria-label="Hiện trạng PC">
                            <option value=""></option>
                            <option value="BC">BC</option>
                            <option value="CH">CH</option>
                          </Form.Select>
                        </td>
                        {Array(4)
                          .fill(0)
                          .map((_, index) => (
                            <td key={index}>
                              <Form.Control type="text" />
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
          max-height: 660px;
          overflow-y: auto;
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 10; /* Đảm bảo tiêu đề nằm trên nội dung bảng */
          background-color: inherit; /* Giữ màu nền của tiêu đề */
        }

        .table th.text-wrap,
        .table td {
          white-space: normal !important;
          padding: 8px;
          vertical-align: middle;
          text-align: center;
        }
        .table th.col-HTPC {
          width: 100px;
        }
        .table th.col-tenCN {
          width: 200px;
        }
        .table th.col-maCN {
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

export default NhapMuChen;
