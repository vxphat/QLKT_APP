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
import danhMucTo from "../nhapMuKhoNM_Nuoc/data";

const NhapMuKhoNM_Nuoc = () => {
  //collapse1
  const [open1, setOpen1] = useState(false);

  const [danhSachTo, setDanhSachTo] = useState(danhMucTo);

  function loadDanhSachTo() {
    setDanhSachTo(danhMucTo); // Cập nhật state để render lại bảng
  }

  return (
    <Fragment>
      <Pageheader
        title="Nhập mủ khô nhà máy - Mủ nước"
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
                    Ngày giao mủ
                  </Form.Label>
                  <Form.Control type="date" id="input-date" />
                </Col>

                <Col xl={3} lg={6} md={6} sm={12}>
                  {/* <Form.Label htmlFor="input-button">Type Button</Form.Label> */}
                  <Form.Control
                    type="button"
                    className="form-control btn btn-primary"
                    id="input-button"
                    defaultValue="Submit"
                    onClick={loadDanhSachTo}
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
                      <th className="col-to text-wrap bg-light">STT</th>
                      <th className="col-to text-wrap bg-light">Tổ</th>
                      <th className="col-phien text-center bg-light text-al">
                        Phiên
                      </th>
                      <th className="col-maCN text-center bg-light text-al">
                        Chuyển tháng sau
                      </th>
                      <th className="col-maCN text-center bg-light text-al">
                        Bất thường khác phiên
                      </th>
                      <th className="text-wrap bg-light">Cốm L1</th>
                      <th className="text-wrap bg-light">DRC</th>
                      <th className="text-wrap bg-light">Cốm L2</th>
                      <th className="text-wrap bg-light">DRC</th>
                      <th className="text-wrap bg-light">Latex L1</th>
                      <th className="text-wrap bg-light">DRC</th>
                      <th className="text-wrap bg-light">Latex L2</th>
                      <th className="text-wrap bg-light">DRC</th>
                      <th className="text-wrap bg-light">Đông L1</th>
                      <th className="text-wrap bg-light">Đông L2</th>
                      <th className="text-wrap bg-light">Dây L1</th>
                      <th className="text-wrap bg-light">Dây L2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {danhSachTo.map((cn) => (
                      <tr key={cn.stt}>
                        <td>{cn.stt}</td>
                        <td>{cn.to}</td>
                        <td>
                          <Form.Select aria-label="Phiên cạo">
                            <option value=""></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Check type="checkbox" />
                        </td>
                        <td>
                          <Form.Check type="checkbox" />
                        </td>

                        {Array(12)
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
        .table th.col-phien {
          width: 100px;
        }

        .table th.col-to {
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

export default NhapMuKhoNM_Nuoc;
