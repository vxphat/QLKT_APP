import { FC, Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  ProgressBar,
  Row,
  Table,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Pageheader from "../../../../../components/pageheader/pageheader";
import { donVidata, hinhThuc, TLMoCao } from "./dinhMucData";

const DinhMuc = () => {
  // Load từ localStorage một lần khi mount
  const [tyLeMoCao, setTyLeMoCao] = useState(() => {
    const saved = localStorage.getItem("tyLeMoCao");
    return saved ? JSON.parse(saved) : TLMoCao;
  });

  useEffect(() => {
    localStorage.setItem("tyLeMoCao", JSON.stringify(tyLeMoCao));
  }, [tyLeMoCao]);

  const [modalShow1, setModalShow1] = useState(false);

  // state cho form trong modal
  const [formDiem, setFormDiem] = useState({
    gt90: "",
    gt80: "",
    ge75: "",
    lt75: "",
  });

  // mở modal và nạp sẵn giá trị hiện tại
  const openCapNhatModal = () => {
    const map = new Map(tyLeMoCao.map((i) => [i.tyLe, i.diem]));
    setFormDiem({
      gt90: String(map.get(">90") ?? ""),
      gt80: String(map.get(">80") ?? ""),
      ge75: String(map.get(">=75") ?? ""),
      lt75: String(map.get("<75") ?? ""),
    });
    setModalShow1(true);
  };

  // helper đổi input -> number | null
  const toNum = (v) => {
    if (v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  // nút “Cập nhật” trong modal
  const handleCapNhat = () => {
    // nếu ô nào bỏ trống / không hợp lệ thì giữ nguyên điểm cũ
    const old = Object.fromEntries(tyLeMoCao.map((i) => [i.tyLe, i.diem]));
    const updated = [
      { tyLe: ">90", diem: toNum(formDiem.gt90) ?? old[">90"] },
      { tyLe: ">80", diem: toNum(formDiem.gt80) ?? old[">80"] },
      { tyLe: ">=75", diem: toNum(formDiem.ge75) ?? old[">=75"] },
      { tyLe: "<75", diem: toNum(formDiem.lt75) ?? old["<75"] },
    ];
    setTyLeMoCao(updated);
    setModalShow1(false);
  };

  return (
    <Fragment>
      <Pageheader title="Định Mức" heading="Tables" active="Tables" />
      <Row>
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>Điểm tỷ lệ cây mở cạo</Card.Title>
              <Col xl={3} lg={6} md={6} sm={12} className="d-flex">
                <Button
                  className="btn btn-secondary label-btn ms-auto"
                  variant="primary"
                  type="button"
                  onClick={openCapNhatModal}>
                  <i className="bi bi-pencil label-btn-icon me-2"></i>
                  Cập nhật
                </Button>
              </Col>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table text-nowrap" id="bangNhap">
                  <thead className="sticky-header">
                    <tr>
                      <th className="text-wrap bg-light ">
                        Tỷ lệ cây mở cạo (%)
                      </th>
                      <th className="text-wrap bg-light">Điểm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tyLeMoCao.map((row) => (
                      <tr key={row.tyLe}>
                        <th className="text-center" scope="row">
                          {row.tyLe}
                        </th>
                        <td className="text-center">{row.diem}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Modal
          centered
          show={modalShow1}
          onHide={() => setModalShow1(false)}
          keyboard={false}
          className="modal fade">
          <Modal.Header closeButton>
            <Modal.Title as="h6">Cập nhật điểm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col xl={12}>
              <Card className="custom-card">
                {/* <Card.Header className="justify-content-between">
                  <Card.Title>Input shapes</Card.Title>
                </Card.Header> */}
                <Card.Body>
                  <div className="row gy-3">
                    <Col xl={12}>
                      <Form.Label htmlFor="input-rounded">
                        Tỷ lệ trên 90%
                      </Form.Label>
                      <Form.Control
                        type="number"
                        inputMode="numeric"
                        value={formDiem.gt90}
                        onChange={(e) =>
                          setFormDiem((s) => ({ ...s, gt90: e.target.value }))
                        }
                        id="input-rounded"
                        placeholder="Nhập điểm"
                      />
                    </Col>
                    <Col xl={12}>
                      <Form.Label htmlFor="input-rounded">
                        Tỷ lệ trên 80%
                      </Form.Label>
                      <Form.Control
                        type="number"
                        inputMode="numeric"
                        value={formDiem.gt80}
                        onChange={(e) =>
                          setFormDiem((s) => ({ ...s, gt80: e.target.value }))
                        }
                        id="input-rounded"
                        placeholder="Nhập điểm"
                      />
                    </Col>
                    <Col xl={12}>
                      <Form.Label htmlFor="input-rounded">
                        Tỷ lệ trên hoặc bằng 75%
                      </Form.Label>
                      <Form.Control
                        type="number"
                        inputMode="numeric"
                        value={formDiem.ge75}
                        onChange={(e) =>
                          setFormDiem((s) => ({ ...s, ge75: e.target.value }))
                        }
                        id="input-rounded"
                        placeholder="Nhập điểm"
                      />
                    </Col>
                    <Col xl={12}>
                      <Form.Label htmlFor="input-rounded">
                        Tỷ lệ dưới 75%
                      </Form.Label>
                      <Form.Control
                        type="number"
                        inputMode="numeric"
                        value={formDiem.lt75}
                        onChange={(e) =>
                          setFormDiem((s) => ({ ...s, lt75: e.target.value }))
                        }
                        id="input-rounded"
                        placeholder="Nhập điểm"
                      />
                    </Col>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setModalShow1(false)}>
              Đóng
            </Button>
            <Button variant="secondary" onClick={handleCapNhat}>
              Cập nhật
            </Button>
          </Modal.Footer>
        </Modal>

        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>Tỷ lệ cây cạo trên 50 cm</Card.Title>
              <Col xl={3} lg={6} md={6} sm={12} className="d-flex">
                <Button className="btn btn-secondary label-btn ms-auto">
                  <i className="bi bi-pencil label-btn-icon me-2"></i>
                  Cập nhật
                </Button>
              </Col>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table text-nowrap" id="bangNhap">
                  <thead className="sticky-header">
                    <tr>
                      <th className="text-wrap bg-light">Tỷ lệ (%)</th>
                      <th className="text-wrap bg-light">Hình thức</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hinhThuc.map((idx) => (
                      <tr key={Math.random()}>
                        <th className="text-center" scope="row">
                          {idx.tyLe}
                        </th>
                        <td className="text-center">{idx.hinhThuc}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>Đơn vị</Card.Title>
              <Col xl={3} lg={6} md={6} sm={12} className="d-flex">
                <Button className="btn btn-secondary label-btn ms-auto">
                  <i className="bi bi-pencil label-btn-icon me-2"></i>
                  Cập nhật
                </Button>
              </Col>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table text-nowrap">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-center bg-light" scope="col">
                        Mã đơn vị
                      </th>
                      <th className="text-center bg-light" scope="col">
                        Đơn vị
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {donVidata.map((idx) => (
                      <tr key={Math.random()}>
                        <th className="text-center" scope="row">
                          {idx.maDonVi}
                        </th>
                        <td className="text-center">{idx.donVi}</td>
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

        .table tr.col.input {
          width: 50px;
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

export default DinhMuc;
